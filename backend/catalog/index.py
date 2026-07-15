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


def row_to_pattern(row) -> dict:
    return {
        'id': row[0],
        'name': row[1],
        'nameEn': row[2],
        'category': row[3],
        'categoryEn': row[4],
        'price': row[5],
        'difficulty': row[6],
        'difficultyEn': row[7],
        'image': row[8],
        'sortOrder': row[9],
    }


def esc(v) -> str:
    if v is None:
        return 'NULL'
    return "'" + str(v).replace("'", "''") + "'"


def list_patterns() -> dict:
    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        SELECT id, name, name_en, category, category_en, price, difficulty, difficulty_en, image, sort_order
        FROM {schema}.patterns ORDER BY sort_order, id
        """
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return respond(200, {'patterns': [row_to_pattern(r) for r in rows]})


def create_pattern(event: dict) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})

    body = event.get('body') or {}
    if isinstance(body, str):
        body = json.loads(body) if body else {}

    name = body.get('name') or ''
    name_en = body.get('nameEn') or ''
    category = body.get('category') or ''
    category_en = body.get('categoryEn') or ''
    price = body.get('price') or 0
    difficulty = body.get('difficulty') or ''
    difficulty_en = body.get('difficultyEn') or ''
    image = body.get('image')
    sort_order = body.get('sortOrder') or 0

    if not name or not category:
        return respond(400, {'error': 'name and category are required'})

    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        INSERT INTO {schema}.patterns (name, name_en, category, category_en, price, difficulty, difficulty_en, image, sort_order)
        VALUES ({esc(name)}, {esc(name_en)}, {esc(category)}, {esc(category_en)}, {int(price)}, {esc(difficulty)}, {esc(difficulty_en)}, {esc(image)}, {int(sort_order)})
        RETURNING id, name, name_en, category, category_en, price, difficulty, difficulty_en, image, sort_order
        """
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return respond(200, {'pattern': row_to_pattern(row)})


def update_pattern(event: dict, pattern_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})

    body = event.get('body') or {}
    if isinstance(body, str):
        body = json.loads(body) if body else {}

    fields = []
    mapping = {
        'name': 'name', 'nameEn': 'name_en', 'category': 'category', 'categoryEn': 'category_en',
        'price': 'price', 'difficulty': 'difficulty', 'difficultyEn': 'difficulty_en',
        'image': 'image', 'sortOrder': 'sort_order',
    }
    for key, col in mapping.items():
        if key in body:
            val = body[key]
            if key in ('price', 'sortOrder'):
                fields.append(f"{col} = {int(val)}")
            else:
                fields.append(f"{col} = {esc(val)}")

    if not fields:
        return respond(400, {'error': 'No fields to update'})

    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        f"""
        UPDATE {schema}.patterns SET {', '.join(fields)} WHERE id = {int(pattern_id)}
        RETURNING id, name, name_en, category, category_en, price, difficulty, difficulty_en, image, sort_order
        """
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if not row:
        return respond(404, {'error': 'Pattern not found'})

    return respond(200, {'pattern': row_to_pattern(row)})


def delete_pattern(event: dict, pattern_id: int) -> dict:
    if not check_admin(event):
        return respond(401, {'error': 'Unauthorized'})

    schema = get_schema()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(f"DELETE FROM {schema}.patterns WHERE id = {int(pattern_id)}")
    deleted = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()

    if not deleted:
        return respond(404, {'error': 'Pattern not found'})

    return respond(200, {'message': 'Deleted'})


def handler(event: dict, context) -> dict:
    """CRUD-операции над каталогом выкроек (публичный список + защищённые изменения)"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    method = (event.get('httpMethod') or '').upper()
    query = event.get('queryStringParameters') or {}
    pattern_id = query.get('id')

    if method == 'GET':
        return list_patterns()
    elif method == 'POST':
        return create_pattern(event)
    elif method == 'PUT':
        if not pattern_id:
            return respond(400, {'error': 'id query parameter is required'})
        return update_pattern(event, int(pattern_id))
    elif method == 'DELETE':
        if not pattern_id:
            return respond(400, {'error': 'id query parameter is required'})
        return delete_pattern(event, int(pattern_id))
    else:
        return respond(405, {'error': 'Method not allowed'})
