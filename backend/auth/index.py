import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta

import psycopg2


def get_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def ensure_tables(cur, schema):
    cur.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {schema}.users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
        """
    )
    cur.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {schema}.sessions (
            id TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES {schema}.users(id) ON DELETE CASCADE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            expires_at TIMESTAMP NOT NULL
        )
        """
    )


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def cors_headers() -> dict:
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def respond(status_code: int, body: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': cors_headers(),
        'body': json.dumps(body, default=str),
    }


def register(event: dict) -> dict:
    body = event.get('body') or {}
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except Exception:
            body = {}

    email = (body.get('email') or '').strip().lower()
    password = body.get('password') or ''
    name = (body.get('name') or '').strip()

    if not email or not password or not name:
        return respond(400, {'error': 'email, password and name are required'})

    password_hash = hash_password(password)
    session_id = secrets.token_hex(32)
    expires_at = datetime.utcnow() + timedelta(days=30)

    email_safe = email.replace("'", "''")
    name_safe = name.replace("'", "''")
    password_hash_safe = password_hash.replace("'", "''")
    session_id_safe = session_id.replace("'", "''")
    expires_at_str = expires_at.strftime('%Y-%m-%d %H:%M:%S')

    schema = get_schema()

    try:
        conn = get_connection()
        conn.autocommit = False
        cur = conn.cursor()

        ensure_tables(cur, schema)

        cur.execute(
            f"SELECT id FROM {schema}.users WHERE email = '{email_safe}'"
        )
        if cur.fetchone():
            conn.rollback()
            cur.close()
            conn.close()
            return respond(409, {'error': 'User with this email already exists'})

        cur.execute(
            f"""
            INSERT INTO {schema}.users (email, password_hash, name, created_at)
            VALUES ('{email_safe}', '{password_hash_safe}', '{name_safe}', NOW())
            RETURNING id, email, name, created_at
            """
        )
        user_row = cur.fetchone()
        user_id = user_row[0]

        cur.execute(
            f"""
            INSERT INTO {schema}.sessions (id, user_id, created_at, expires_at)
            VALUES ('{session_id_safe}', {user_id}, NOW(), '{expires_at_str}')
            """
        )

        conn.commit()
        cur.close()
        conn.close()

        return respond(200, {
            'session_id': session_id,
            'user': {
                'id': user_row[0],
                'email': user_row[1],
                'name': user_row[2],
                'created_at': str(user_row[3]),
            },
        })

    except Exception as e:
        return respond(500, {'error': str(e)})


def login(event: dict) -> dict:
    body = event.get('body') or {}
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except Exception:
            body = {}

    email = (body.get('email') or '').strip().lower()
    password = body.get('password') or ''

    if not email or not password:
        return respond(400, {'error': 'email and password are required'})

    password_hash = hash_password(password)
    session_id = secrets.token_hex(32)
    expires_at = datetime.utcnow() + timedelta(days=30)

    email_safe = email.replace("'", "''")
    password_hash_safe = password_hash.replace("'", "''")
    session_id_safe = session_id.replace("'", "''")
    expires_at_str = expires_at.strftime('%Y-%m-%d %H:%M:%S')

    schema = get_schema()

    try:
        conn = get_connection()
        conn.autocommit = False
        cur = conn.cursor()

        ensure_tables(cur, schema)

        cur.execute(
            f"""
            SELECT id, email, name, created_at FROM {schema}.users
            WHERE email = '{email_safe}' AND password_hash = '{password_hash_safe}'
            """
        )
        user_row = cur.fetchone()
        if not user_row:
            conn.rollback()
            cur.close()
            conn.close()
            return respond(401, {'error': 'Invalid email or password'})

        user_id = user_row[0]

        cur.execute(
            f"""
            INSERT INTO {schema}.sessions (id, user_id, created_at, expires_at)
            VALUES ('{session_id_safe}', {user_id}, NOW(), '{expires_at_str}')
            """
        )

        conn.commit()
        cur.close()
        conn.close()

        return respond(200, {
            'session_id': session_id,
            'user': {
                'id': user_row[0],
                'email': user_row[1],
                'name': user_row[2],
                'created_at': str(user_row[3]),
            },
        })

    except Exception as e:
        return respond(500, {'error': str(e)})


def logout(event: dict) -> dict:
    headers = event.get('headers') or {}
    session_id = (
        headers.get('X-Session-Id')
        or headers.get('x-session-id')
        or ''
    ).strip()

    if not session_id:
        return respond(400, {'error': 'X-Session-Id header is required'})

    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()

    try:
        conn = get_connection()
        conn.autocommit = False
        cur = conn.cursor()

        ensure_tables(cur, schema)

        cur.execute(
            f"UPDATE {schema}.sessions SET expires_at = NOW() WHERE id = '{session_id_safe}'"
        )

        conn.commit()
        cur.close()
        conn.close()

        return respond(200, {'message': 'Logged out successfully'})

    except Exception as e:
        return respond(500, {'error': str(e)})


def me(event: dict) -> dict:
    headers = event.get('headers') or {}
    session_id = (
        headers.get('X-Session-Id')
        or headers.get('x-session-id')
        or ''
    ).strip()

    if not session_id:
        return respond(400, {'error': 'X-Session-Id header is required'})

    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()

    try:
        conn = get_connection()
        conn.autocommit = False
        cur = conn.cursor()

        ensure_tables(cur, schema)

        cur.execute(
            f"""
            SELECT u.id, u.email, u.name, u.created_at
            FROM {schema}.sessions s
            JOIN {schema}.users u ON u.id = s.user_id
            WHERE s.id = '{session_id_safe}'
              AND s.expires_at > NOW()
            """
        )
        user_row = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if not user_row:
            return respond(401, {'error': 'Invalid or expired session'})

        return respond(200, {
            'user': {
                'id': user_row[0],
                'email': user_row[1],
                'name': user_row[2],
                'created_at': str(user_row[3]),
            },
        })

    except Exception as e:
        return respond(500, {'error': str(e)})


def handler(event: dict, context) -> dict:
    """Авторизация и регистрация пользователей"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers(),
            'body': '',
        }

    raw_path = event.get('path', '')
    # Normalize path: strip any leading function-id prefix and keep only the last segment
    # e.g. '/d4ele9fcvodhsq3k3tqq/register' -> '/register'
    parts = [p for p in raw_path.split('/') if p]
    known_routes = {'register', 'login', 'logout', 'me'}
    if parts and parts[-1] in known_routes:
        path = '/' + parts[-1]
    else:
        path = raw_path

    method = (event.get('httpMethod') or '').upper()

    if path == '/register' and method == 'POST':
        return register(event)
    elif path == '/login' and method == 'POST':
        return login(event)
    elif path == '/logout' and method == 'POST':
        return logout(event)
    elif path == '/me' and method == 'GET':
        return me(event)
    else:
        return respond(404, {'error': f'Route {method} {path} not found'})