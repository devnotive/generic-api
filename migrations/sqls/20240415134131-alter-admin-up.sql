/* Replace with your SQL commands */
ALTER TABLE admins
    ALTER COLUMN reset_password_otp TYPE VARCHAR;

ALTER TABLE admins
    ADD COLUMN reset_password_expiry_new TIMESTAMPTZ;

UPDATE admins
SET reset_password_expiry_new = reset_password_expiry::TIMESTAMPTZ;

ALTER TABLE admins
    DROP COLUMN reset_password_expiry;

ALTER TABLE admins
    RENAME COLUMN reset_password_expiry_new TO reset_password_expiry;
