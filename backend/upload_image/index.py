import json
import os
import base64
import uuid

import boto3
import psycopg2


def get_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema():
    return os.environ.get('MAIN_DB_SCHEMA', 'public')


def cors_headers() -> dict:
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Session',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def respond(status_code: int, body) -> dict:
    return {
        'statusCode': status_code,
        'headers': cors_headers(),
        'body': json.dumps(body, default=str),
    }


def check_admin(event: dict) -> bool:
    headers = event.get('headers') or {}
    session_id = (headers.get('X-Admin-Session') or headers.get('x-admin-session') or '').strip()
    if not session_id:
        return False
    session_id_safe = session_id.replace("'", "''")
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"SELECT id FROM {schema}.admin_sessions WHERE id = '{session_id_safe}' AND expires_at > NOW()"
    )
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row is not None


def handler(event: dict, context) -> dict:
    """Загрузка изображения в S3-хранилище для использования в каталоге/контенте сайта"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    if (event.get('httpMethod') or '').upper() != 'POST':
        return respond(405, {'error': 'Method not allowed'})

    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})

    body_raw = event.get('body') or {}
    if isinstance(body_raw, str):
        try:
            body = json.loads(body_raw) if body_raw else {}
        except Exception:
            body = {}
    else:
        body = body_raw or {}

    image_base64 = body.get('image') or ''
    content_type = body.get('contentType') or 'image/jpeg'

    if not image_base64:
        return respond(400, {'error': 'image (base64) is required'})

    if ',' in image_base64:
        image_base64 = image_base64.split(',', 1)[1]

    try:
        image_bytes = base64.b64decode(image_base64)
    except Exception:
        return respond(400, {'error': 'Invalid base64 image data'})

    ext = 'jpg'
    if 'png' in content_type:
        ext = 'png'
    elif 'webp' in content_type:
        ext = 'webp'

    key = f"photos/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=image_bytes, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return respond(200, {'url': cdn_url})
