CREATE TYPE userType AS ENUM ('individual', 'organization');

CREATE TABLE IF NOT EXISTS "UserAccount" (
    "id" VARCHAR PRIMARY KEY,
    "fullName" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
--     "userType" userType NOT NULL,
    "otp" TYPE VARCHAR(255),
--     "contactAddress" VARCHAR(255),
--     "bankName" VARCHAR(255),
--     "bvnNumber" VARCHAR(255),
--     "accountNumber" VARCHAR(255),
--     "ninId" VARCHAR(255),
--     "driversLicenseId" VARCHAR(255),
--     "officeAddress" VARCHAR(255),
--     "rcNumber" VARCHAR(255),
--     "bnNumber" VARCHAR(255),
--     "hasVerifiedPhoneNumber" BOOLEAN DEFAULT FALSE,
--     "hasVerifiedContact" BOOLEAN DEFAULT FALSE,
--     "hasVerifiedNin" BOOLEAN DEFAULT FALSE,
--     "hasVerifiedDriversLicense" BOOLEAN DEFAULT FALSE,
--     "hasVerifiedPassport" BOOLEAN DEFAULT FALSE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
