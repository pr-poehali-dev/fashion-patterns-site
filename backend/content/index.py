import json
import os

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


def esc(v) -> str:
    if v is None:
        return 'NULL'
    return "'" + str(v).replace("'", "''") + "'"


# ---------- Reviews ----------

def review_row(row) -> dict:
    return {
        'id': row[0], 'name': row[1], 'stars': row[2],
        'textRu': row[3], 'textEn': row[4], 'sortOrder': row[5],
    }


def list_reviews() -> dict:
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"SELECT id, name, stars, text_ru, text_en, sort_order FROM {schema}.reviews ORDER BY sort_order, id")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return respond(200, {'reviews': [review_row(r) for r in rows]})


def create_review(event: dict, body: dict) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    name = body.get('name') or ''
    stars = int(body.get('stars') or 5)
    text_ru = body.get('textRu') or ''
    text_en = body.get('textEn') or ''
    sort_order = int(body.get('sortOrder') or 0)
    if not name or not text_ru:
        return respond(400, {'error': 'name and textRu are required'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        INSERT INTO {schema}.reviews (name, stars, text_ru, text_en, sort_order)
        VALUES ({esc(name)}, {stars}, {esc(text_ru)}, {esc(text_en)}, {sort_order})
        RETURNING id, name, stars, text_ru, text_en, sort_order
        """
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return respond(200, {'review': review_row(row)})


def update_review(event: dict, body: dict, item_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    fields = []
    mapping = {'name': 'name', 'stars': 'stars', 'textRu': 'text_ru', 'textEn': 'text_en', 'sortOrder': 'sort_order'}
    for key, col in mapping.items():
        if key in body:
            val = body[key]
            fields.append(f"{col} = {int(val)}" if key in ('stars', 'sortOrder') else f"{col} = {esc(val)}")
    if not fields:
        return respond(400, {'error': 'No fields to update'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"UPDATE {schema}.reviews SET {', '.join(fields)} WHERE id = {item_id} RETURNING id, name, stars, text_ru, text_en, sort_order"
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not row:
        return respond(404, {'error': 'Review not found'})
    return respond(200, {'review': review_row(row)})


def delete_review(event: dict, item_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"DELETE FROM {schema}.reviews WHERE id = {item_id}")
    deleted = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    if not deleted:
        return respond(404, {'error': 'Review not found'})
    return respond(200, {'message': 'Deleted'})


# ---------- Blog posts ----------

def post_row(row) -> dict:
    return {
        'id': row[0], 'title': row[1], 'titleEn': row[2],
        'tag': row[3], 'tagEn': row[4], 'date': row[5], 'sortOrder': row[6],
    }


def list_posts() -> dict:
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"SELECT id, title, title_en, tag, tag_en, post_date, sort_order FROM {schema}.blog_posts ORDER BY sort_order, id")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return respond(200, {'posts': [post_row(r) for r in rows]})


def create_post(event: dict, body: dict) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    title = body.get('title') or ''
    title_en = body.get('titleEn') or ''
    tag = body.get('tag') or ''
    tag_en = body.get('tagEn') or ''
    date = body.get('date') or ''
    sort_order = int(body.get('sortOrder') or 0)
    if not title or not date:
        return respond(400, {'error': 'title and date are required'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        INSERT INTO {schema}.blog_posts (title, title_en, tag, tag_en, post_date, sort_order)
        VALUES ({esc(title)}, {esc(title_en)}, {esc(tag)}, {esc(tag_en)}, {esc(date)}, {sort_order})
        RETURNING id, title, title_en, tag, tag_en, post_date, sort_order
        """
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return respond(200, {'post': post_row(row)})


def update_post(event: dict, body: dict, item_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    fields = []
    mapping = {'title': 'title', 'titleEn': 'title_en', 'tag': 'tag', 'tagEn': 'tag_en', 'date': 'post_date', 'sortOrder': 'sort_order'}
    for key, col in mapping.items():
        if key in body:
            val = body[key]
            fields.append(f"{col} = {int(val)}" if key == 'sortOrder' else f"{col} = {esc(val)}")
    if not fields:
        return respond(400, {'error': 'No fields to update'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"UPDATE {schema}.blog_posts SET {', '.join(fields)} WHERE id = {item_id} RETURNING id, title, title_en, tag, tag_en, post_date, sort_order"
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    if not row:
        return respond(404, {'error': 'Post not found'})
    return respond(200, {'post': post_row(row)})


def delete_post(event: dict, item_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"DELETE FROM {schema}.blog_posts WHERE id = {item_id}")
    deleted = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    if not deleted:
        return respond(404, {'error': 'Post not found'})
    return respond(200, {'message': 'Deleted'})


# ---------- Site texts ----------

def list_texts() -> dict:
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"SELECT key, value_ru, value_en FROM {schema}.site_texts ORDER BY key")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return respond(200, {'texts': [{'key': r[0], 'valueRu': r[1], 'valueEn': r[2]} for r in rows]})


def update_text(event: dict, body: dict) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})
    key = body.get('key') or ''
    value_ru = body.get('valueRu')
    value_en = body.get('valueEn')
    if not key:
        return respond(400, {'error': 'key is required'})
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        INSERT INTO {schema}.site_texts (key, value_ru, value_en, updated_at)
        VALUES ({esc(key)}, {esc(value_ru)}, {esc(value_en)}, NOW())
        ON CONFLICT (key) DO UPDATE SET value_ru = {esc(value_ru)}, value_en = {esc(value_en)}, updated_at = NOW()
        RETURNING key, value_ru, value_en
        """
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return respond(200, {'text': {'key': row[0], 'valueRu': row[1], 'valueEn': row[2]}})


def handler(event: dict, context) -> dict:
    """CRUD для отзывов, статей блога и текстов сайта (публичное чтение + защищённые изменения)"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    method = (event.get('httpMethod') or '').upper()
    query = event.get('queryStringParameters') or {}
    resource = query.get('resource') or ''
    item_id = query.get('id')

    body_raw = event.get('body') or {}
    if isinstance(body_raw, str):
        try:
            body = json.loads(body_raw) if body_raw else {}
        except Exception:
            body = {}
    else:
        body = body_raw or {}

    if resource == 'reviews':
        if method == 'GET':
            return list_reviews()
        elif method == 'POST':
            return create_review(event, body)
        elif method == 'PUT':
            if not item_id:
                return respond(400, {'error': 'id query parameter is required'})
            return update_review(event, body, int(item_id))
        elif method == 'DELETE':
            if not item_id:
                return respond(400, {'error': 'id query parameter is required'})
            return delete_review(event, int(item_id))

    elif resource == 'posts':
        if method == 'GET':
            return list_posts()
        elif method == 'POST':
            return create_post(event, body)
        elif method == 'PUT':
            if not item_id:
                return respond(400, {'error': 'id query parameter is required'})
            return update_post(event, body, int(item_id))
        elif method == 'DELETE':
            if not item_id:
                return respond(400, {'error': 'id query parameter is required'})
            return delete_post(event, int(item_id))

    elif resource == 'texts':
        if method == 'GET':
            return list_texts()
        elif method == 'POST':
            return update_text(event, body)

    return respond(400, {'error': 'Unknown resource. Use ?resource=reviews|posts|texts'})
