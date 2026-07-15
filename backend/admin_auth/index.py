import json
import os
import secrets
from datetime import datetime, timedelta

import psycopg2


def get_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def ensure_table(cur, schema):
    cur.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {schema}.admin_sessions (
            id TEXT PRIMARY KEY,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL
        )
        """
    )


def cors_headers() -> dict:
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Session',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def respond(status_code: int, body: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': cors_headers(),
        'body': json.dumps(body, default=str),
    }


def login(event: dict) -> dict:
    body = event.get('body') or {}
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except Exception:
            body = {}

    password = body.get('password') or ''
    admin_password = os.environ.get('ADMIN_PASSWORD', '')

    if not admin_password:
        return respond(500, {'error': 'ADMIN_PASSWORD is not configured'})

    if password != admin_password:
        return respond(401, {'error': 'Invalid password'})

    session_id = secrets.token_hex(32)
    expires_at = datetime.utcnow() + timedelta(days=7)
    expires_at_str = expires_at.strftime('%Y-%m-%d %H:%M:%S')
    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()

    conn = get_connection()
    conn.autocommit = False
    cur = conn.cursor()
    ensure_table(cur, schema)
    cur.execute(
        f"INSERT INTO {schema}.admin_sessions (id, created_at, expires_at) VALUES ('{session_id_safe}', NOW(), '{expires_at_str}')"
    )
    conn.commit()
    cur.close()
    conn.close()

    return respond(200, {'session_id': session_id})


def check(event: dict) -> dict:
    headers = event.get('headers') or {}
    session_id = (headers.get('X-Admin-Session') or headers.get('x-admin-session') or '').strip()

    if not session_id:
        return respond(401, {'error': 'X-Admin-Session header is required'})

    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()

    conn = get_connection()
    conn.autocommit = False
    cur = conn.cursor()
    ensure_table(cur, schema)
    cur.execute(
        f"SELECT id FROM {schema}.admin_sessions WHERE id = '{session_id_safe}' AND expires_at > NOW()"
    )
    row = cur.fetchone()
    cur.close()
    conn.close()

    if not row:
        return respond(401, {'error': 'Invalid or expired session'})

    return respond(200, {'valid': True})


def logout(event: dict) -> dict:
    headers = event.get('headers') or {}
    session_id = (headers.get('X-Admin-Session') or headers.get('x-admin-session') or '').strip()

    if not session_id:
        return respond(200, {'message': 'Logged out'})

    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()

    conn = get_connection()
    conn.autocommit = False
    cur = conn.cursor()
    ensure_table(cur, schema)
    cur.execute(f"DELETE FROM {schema}.admin_sessions WHERE id = '{session_id_safe}'")
    conn.commit()
    cur.close()
    conn.close()

    return respond(200, {'message': 'Logged out'})


def handler(event: dict, context) -> dict:
    """Авторизация администратора сайта по паролю (отдельно от пользователей)"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    body_raw = event.get('body') or {}
    if isinstance(body_raw, str):
        try:
            body_parsed = json.loads(body_raw)
        except Exception:
            body_parsed = {}
    else:
        body_parsed = body_raw

    query = event.get('queryStringParameters') or {}
    action = body_parsed.get('action') or query.get('action') or ''

    if action == 'login':
        return login(event)
    elif action == 'check':
        return check(event)
    elif action == 'logout':
        return logout(event)
    else:
        return respond(400, {'error': 'Unknown action. Use: login, check, logout'})
