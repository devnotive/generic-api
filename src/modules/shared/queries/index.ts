const fetchTransactionByReference = `
  SELECT "id", "userId", "walletId", "amount", "transactionCategory", "transactionStatus", "reference", "createdAt"
  FROM "Transactions"
  WHERE "reference" = $1;`;

const completeTransaction = `
  UPDATE 
  "Transactions" SET "transactionStatus" = 'completed', "transactionMethod"=$2 WHERE "id" = $1
  RETURNING *`;

const fundWalletAndRecordInLedger = `
    BEGIN;
    -- Do credit first
    UPDATE "Wallets" SET balance = balance + $2 WHERE id = $1;

    UPDATE "Wallets" SET balance = balance - $2 WHERE id = 'SUPER_ADMIN_00000001';

    -- Do credit first
    INSERT INTO "TransactionLedger" (
        "creditAmount",
        "debitAmount",
        "transactionType",
        "transactionId",
        "creditedWalletId",
        "debitedWalletId",
        "transactionCategory"
    ) VALUES (
        $2, 0, 'credit', $3, $1, 'SUPER_ADMIN_00000001', 'fund'
    );

    INSERT INTO "TransactionLedger" (
        "creditAmount",
        "debitAmount",
        "transactionType",
        "transactionId",
        "creditedWalletId",
        "debitedWalletId",
        "transactionCategory"
    ) VALUES (
        0, $2, 'debit', $3, $1, 'SUPER_ADMIN_00000001', 'fund'
    );
    COMMIT;

    SELECT 
    "id",
    ROUND("balance"::INT / 100.0,2) as balance,
    "createdAt",
    "updatedAt"
    FROM "Wallets" WHERE id = $1
    LIMIT 1;
`;

export const sharedQueries = {
  fetchTransactionByReference,
  completeTransaction,
  fundWalletAndRecordInLedger,
};
