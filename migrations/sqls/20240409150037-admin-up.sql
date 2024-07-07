CREATE TABLE IF NOT EXISTS roles (
    id VARCHAR PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(255) DEFAULT 'inactive',
    permissions TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admins (
    id VARCHAR PRIMARY KEY,
    full_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    reset_password_otp TIMESTAMPTZ,
    reset_password_expiry VARCHAR(255),
    role VARCHAR REFERENCES roles(id) ON DELETE CASCADE,
    status VARCHAR(255) DEFAULT 'inactive',
    is_super_admin BOOLEAN DEFAULT false,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);