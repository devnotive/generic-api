CREATE TABLE IF NOT EXISTS "Wallets"(
	"id" VARCHAR PRIMARY KEY,
	"userId" VARCHAR,
	"adminId" VARCHAR,
    "savingsId" VARCHAR,
    "savingsType" VARCHAR, -- thrift, target
	"accountType" VARCHAR, -- user, admin, savings
	"balance" BIGINT NOT NULL DEFAULT 0,
    "pin" VARCHAR(120),
    "salt" VARCHAR(120),
	"hasCreatedPin" BOOLEAN DEFAULT FALSE,
	"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY ("userId") REFERENCES "UserAccount"(id) ON DELETE CASCADE
);


-- create accounting table or transactions table for double entry bookkeeping
CREATE TABLE IF NOT EXISTS "Transactions"(
	"id" VARCHAR PRIMARY KEY,
	"walletId" VARCHAR,
	"amount" BIGINT NOT NULL DEFAULT 0,
	"transactionCategory" VARCHAR, -- savings, withdrawal, fund, transfer
	"transactionMethod" VARCHAR, -- bank, cash, transfer, card, internal
	"transactionStatus" VARCHAR, -- pending, completed, failed
	"transactionCode" VARCHAR,
	"transactionDescription" TEXT,
	"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION generate_uuid_without_hyphens()
RETURNS TEXT AS $$
BEGIN
    RETURN replace(uuid_generate_v4()::text, '-', '');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_uuid_without_hyphens()
RETURNS TRIGGER AS $$
BEGIN
    NEW."id" := generate_uuid_without_hyphens();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS "TransactionLedger"(
	"id" VARCHAR(50) PRIMARY KEY,
	"transactionId" VARCHAR,
	"creditedWalletId" VARCHAR,
	"debitedWalletId" VARCHAR,
	"debitAmount" BIGINT NOT NULL DEFAULT 0,
	"creditAmount" BIGINT NOT NULL DEFAULT 0,
	"transactionType" VARCHAR, -- credit, debit
	"transactionCategory" VARCHAR, -- savings, withdrawal, fund, transfer
	"createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	"updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE CASCADE
);

CREATE OR REPLACE TRIGGER before_insert_set_uuid
BEFORE INSERT ON "TransactionLedger"
FOR EACH ROW
EXECUTE FUNCTION set_uuid_without_hyphens();