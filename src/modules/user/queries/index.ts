const checkIfUserExists = `
SELECT * FROM "UserAccount" WHERE LOWER("email") = LOWER($1) OR "phoneNumber" = $2 OR "userName" = $3;
`;

const createUserAccount = `
INSERT INTO "UserAccount" ("id", "fullName", "userName", "email", "phoneNumber", "password")
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING "id", "fullName", "userName", "email", "phoneNumber", "createdAt";
`;

const storeOtp = `
UPDATE "UserAccount" SET "otp" = $2 WHERE "id" = $1;
`;

const getUserById = `SELECT 
"id", "fullName", "userName", "email", "phoneNumber", "otp", "createdAt"
FROM "UserAccount" WHERE "id" = $1;`;

const getUserByPhoneNumber = `SELECT "id", "fullName", "userName", "email", "phoneNumber", "otp", "createdAt" FROM "UserAccount" WHERE "phoneNumber" = $1;`;

const getUserByEmail = `
SELECT "id", "fullName", "userName", "password", "email", "phoneNumber", "createdAt", "otp"
FROM "UserAccount" WHERE LOWER("email") = LOWER($1);`;

// const updateOnboardingVerificationStatus = `
// UPDATE "UserAccount"
// SET
//     "hasVerifiedPhoneNumber" = CASE
//                                     WHEN $2 = 'phone number' THEN TRUE
//                                     ELSE "hasVerifiedPhoneNumber"
//                                 END,
//     "hasVerifiedContact" = CASE
//                                 WHEN $2 = 'contact' THEN TRUE
//                                 ELSE "hasVerifiedContact"
//                             END,
//     "hasVerifiedNin" = CASE
//                             WHEN $2 = 'nin' THEN TRUE
//                             ELSE "hasVerifiedNin"
//                         END,
//     "hasVerifiedDriversLicense" = CASE
//                                         WHEN $2 = 'drivers license' THEN TRUE
//                                         ELSE "hasVerifiedDriversLicense"
//                                     END,
//     "hasVerifiedPassport" = CASE
//                                 WHEN $2 = 'passport' THEN TRUE
//                                 ELSE "hasVerifiedPassport"
//                             END,
//     "hasVerifiedBankAccount" = CASE
//                                 WHEN $2 = 'bank account' THEN TRUE
//                                 ELSE "hasVerifiedBankAccount"
//                             END,
//     "hasVerifiedBvn" = CASE
//                                 WHEN $2 = 'bvn' THEN TRUE
//                                 ELSE "hasVerifiedBvn"
//                             END,
//     "hasVerifiedAddress" = CASE
//                                 WHEN $2 = 'address' THEN TRUE
//                                 ELSE "hasVerifiedAddress"
//                             END,
//     "hasVerifiedCac" = CASE
//                                 WHEN $2 = 'cac' THEN TRUE
//                                 ELSE "hasVerifiedCac"
//                             END
// WHERE "id" = $1
// RETURNING "id", "fullName", "userName", "email", "phoneNumber", "userType", "otp", "createdAt",
// "hasVerifiedPhoneNumber","hasVerifiedContact","hasVerifiedNin", "hasVerifiedDriversLicense","hasVerifiedPassport",
// "hasVerifiedBankAccount","hasVerifiedBvn","hasVerifiedAddress","hasVerifiedCac";
// `;

// const updateIndividualContactInfo = `
// UPDATE "UserAccount"
// SET
//     "streetName" = $2,
//     "lgaName" = $3,
//     "stateName" = $4,
//     "bankName" = $5,
//     "bvnNumber" = $6,
//     "accountNumber" = $7
//
// WHERE "id" = $1;
// `;

// const updateOrganizationContactInfo = `
// UPDATE "UserAccount"
// SET
//     "streetName" = $2,
//     "lgaName" = $3,
//     "stateName" = $4,
//     "rcNumber" = $5,
//     "bnNumber" = $6,
//     "bankName" = $7,
//     "accountNumber" = $8,
// WHERE "id" = $1;
// `;

// const updateOrganizationRepInfo = `
// UPDATE "UserAccount"
// SET
//     "authorizedRepName" = $2,
//     "officialEmailAddress" = $3,
//     "staffLoanEligibility" =$4
// WHERE "id" = $1;
// SELECT * FROM "UserAccount" WHERE "id"=$1;
// `;

// const updateUserDocuments = `
// UPDATE "UserAccount"
// SET
//     "ninId" = CASE
//                 WHEN $2 = 'nin' THEN $3
//                 ELSE "ninId"
//               END,
//     "driversLicenseId" = CASE
//                             WHEN $2 = 'drivers license' THEN $3
//                             ELSE "driversLicenseId"
//                           END,
//     "passportId" = CASE
//                         WHEN $2 = 'passport' THEN $3
//                         ELSE "passportId"
//                     END,
//     "bvnNumber" = CASE
//                         WHEN $2 = 'bvn' THEN $3
//                         ELSE "bvnNumber"
//                     END
// WHERE "id" = $1;
// `;

const resetPassword = `
UPDATE "UserAccount" SET "password" = $2 WHERE "id" = $1;
`;

const getUserByUserName = `SELECT * FROM "UserAccount" WHERE "userName" = $1;`;

const getUserNameSuggestions = `
    SELECT suggestion
FROM (
    SELECT unnest($1::VARCHAR[]) AS suggestion
) AS suggestions
WHERE suggestion NOT IN (
    SELECT "userName" FROM "UserAccount"
)`;

const updateBankAccountDetails = `
INSERT INTO "Banks" ("id", "name", "accountNumber", "code", "userId", "currency","bankName")
VALUES ($1, $2, $3, $4, $5, 'NGN', $6);`;

const updateOnboardingDetails = `
UPDATE "UserAccount"
SET
    "ninId" = CASE 
                    WHEN $2 = 'nin' THEN $3
                    ELSE "ninId"
                END,
    "driversLicenseId" = CASE 
                            WHEN $2 = 'drivers license' THEN $3
                            ELSE "driversLicenseId"
                        END,
    "passportId" = CASE 
                        WHEN $2 = 'passport' THEN $3
                        ELSE "passportId"
                    END,
    "bvnNumber" = CASE 
                        WHEN $2 = 'bvn' THEN $3
                        ELSE "bvnNumber"
                    END
WHERE "id" = $1;
`;

const updateAddressInfo = `
UPDATE "UserAccount" SET "streetName" = $2, "lgaName" = $3, "stateName" = $4, "city" = $5, "hasVerifiedAddress" = true
WHERE "id" = $1
RETURNING "id", "fullName", "userName", "email", "phoneNumber", "userType", "createdAt",
"hasVerifiedPhoneNumber","hasVerifiedContact","hasVerifiedNin", "hasVerifiedDriversLicense","hasVerifiedPassport",
"hasVerifiedBankAccount","hasVerifiedBvn","hasVerifiedAddress","hasVerifiedCac";`;

const createWallet = `
INSERT INTO "Wallets" ("id", "userId", "accountType")
VALUES ($1, $2, 'user')
RETURNING "id", "userId", "accountType", "balance", "createdAt";
`;

const fetchTransactionHistory = `
WITH transactions AS (
	SELECT tr."id", tr."amount", tr."transactionCategory", tr."transactionCode", 
    tr."transactionMethod", tr."transactionStatus", 
	tr."transactionDescription", tr."createdAt", tr."reference", tr."userId", tr."savingsId",
	s."planName", s."savingsType"
	FROM "Transactions" tr
	LEFT JOIN "Savings" s on s."id" = tr."savingsId"
	WHERE "userId" = $1
)

SELECT 
    "id",
    "amount",
    "transactionCode",
    "transactionCategory",
    "transactionMethod",
    "transactionStatus",
    "transactionDescription",
    "createdAt",
    "reference",
    "userId",
    "planName",
    "savingsType",
    "createdAt",
    CASE 
        WHEN "transactionCategory" = 'savings' THEN COALESCE("planName", "transactionDescription")
        WHEN "transactionCategory" = 'loan' THEN 'Loan'
        WHEN "transactionCategory" = 'fund' THEN 'Fund Wallet'
        WHEN "transactionCategory" = 'withdraw' THEN 'Wallet Withdrawal'
        ELSE NULL
    END AS "transactionName"
FROM transactions
`;

const countFetchTransactionHistory = `
WITH transactions AS (
	SELECT tr."id", tr."amount", tr."transactionCategory", tr."transactionMethod", tr."transactionStatus", 
	tr."transactionDescription", tr."createdAt", tr."reference", tr."userId", tr."savingsId",
	s."planName", s."savingsType"
	FROM "Transactions" tr
	LEFT JOIN "Savings" s on s."id" = tr."savingsId"
	WHERE "userId" = $1
)

SELECT 
    COUNT("id")
FROM transactions`;

export const userQueries = {
  checkIfUserExists,
  createUserAccount,
  storeOtp,
  getUserById,
  getUserByPhoneNumber,
  getUserByEmail,
  getUserByUserName,
  // updateOnboardingVerificationStatus,
  // updateIndividualContactInfo,
  // updateOrganizationContactInfo,
  // updateOrganizationRepInfo,
  // updateUserDocuments,
  resetPassword,
  getUserNameSuggestions,
  updateBankAccountDetails,
  updateOnboardingDetails,
  updateAddressInfo,
  createWallet,
  fetchTransactionHistory,
  countFetchTransactionHistory,
};
