CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p83034167_fashion_patterns_sit.sessions (
    id VARCHAR(64) PRIMARY KEY,
    user_id INTEGER REFERENCES t_p83034167_fashion_patterns_sit.users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
);