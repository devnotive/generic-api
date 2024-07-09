// import dayjs from 'dayjs';
import z from 'zod';

export const createUserValidator = z.object({
  fullName: z.string().min(3).max(255),
  userName: z.string().min(3).max(255),
  email: z.string().email('This field must be a valid email address.'),
  phoneNumber: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ),
});

export const verifyPhoneNumberOtpValidator = z.object({
  phoneNumber: z.string(),
  otp: z.number(),
});

export const sendPhoneNumberOtpValidator = z.object({
  phoneNumber: z.string(),
});

export const updateIndividualContactInfoValidator = z.object({
  id: z.string(),
  streetName: z.string(),
  lgaName: z.string(),
  stateName: z.string(),
  bankName: z.string(),
  bvnNumber: z.string(),
  accountNumber: z.string(),
});

export const verifyOrganizationContactInfoValidator = z.object({
  id: z.string(),
  rcNumber: z.string(),
  bnNumber: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
});

export const verifyIndividualContactInfoValidator = z.object({
  id: z.string(),
  bankName: z.string(),
  bvnNumber: z.string(),
  accountNumber: z.string(),
});

export const verifyAddressInfoValidator = z.object({
  id: z.string(),
  streetName: z.string(),
  lgaName: z.string(),
  stateName: z.string(),
  city: z.string(),
});

export const updateOrganizationContactInfoValidator = z.object({
  id: z.string(),
  streetName: z.string(),
  lgaName: z.string(),
  stateName: z.string(),
  rcNumber: z.string(),
  bnNumber: z.string(),
  bankName: z.string(),
  accountNumber: z.string(),
});

export const verifyOrganizationRepInfoValidator = z.object({
  id: z.string(),
  authorizedRepName: z.string(),
  officialEmailAddress: z.string(),
  staffLoanEligibility: z.boolean(),
});

// export const verifyAccountValidator = z.object({
//   id: z.string(),
//   verificationType: z.nativeEnum(VerifyDocument),
//   document: z.string(),
//   env: z.string(),
// });

export const loginValidator = z.object({
  email: z.string().email('This field must be a valid email address.'),
  password: z.string(),
});

export const forgotPasswordValidator = z.object({
  email: z.string().email('This field must be a valid email address.'),
});

export const verifyForgotPasswordOtpValidator = z.object({
  email: z.string().email('This field must be a valid email address.'),
  otp: z.number(),
});

export const resetPasswordValidator = z.object({
  email: z.string().email('This field must be a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*()-_=+{};:'"\\|,.<>?/]).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
    ),
});

export const isUserNameAvailableValidator = z.object({
  userName: z.string(),
});

export const getUserNameSuggestionsValidator = z.object({
  fullName: z.string(),
});

export const verifyUserBankAccountValidator = z.object({
  accountNumber: z.string(),
  bankCode: z.string(),
  bankName: z.string(),
  id: z.string(),
  env: z.string(),
});

// export const verifyCacDocument = z.object({
//   id: z.string(),
//   documentId: z.string(),
//   documentType: z.nativeEnum(CacDocumentType),
//   env: z.string(),
// });

// export const fetchTransactionHistoryValidator = z.object({
//   date: z.coerce
//     .date()
//     .optional()
//     .nullable()
//     .default(dayjs(new Date()).format('YYYY-MM-DD') as unknown as Date),
//   type: z.nativeEnum(TransactionType).optional().nullable(),
//   search: z.string().optional().nullable(),
//   status: z.nativeEnum(TransactionStatus).optional(),
//   page: z.coerce.number().optional(),
//   limit: z.coerce.number().optional(),
// });

export type CreateUserValidator = typeof createUserValidator._type;
export type VerifyPhoneNumberOtpValidator =
  typeof verifyPhoneNumberOtpValidator._type;
export type SendPhoneNumberOtpValidator =
  typeof sendPhoneNumberOtpValidator._type;
export type UpdateIndividualContactInfoValidator =
  typeof updateIndividualContactInfoValidator._type;
export type UpdateOrganizationContactInfoValidator =
  typeof updateOrganizationContactInfoValidator._type;
export type VerifyOrganizationRepInfoValidator =
  typeof verifyOrganizationRepInfoValidator._type;
// export type VerifyAccountValidator = typeof verifyAccountValidator._type;
export type LoginValidator = typeof loginValidator._type;
export type ForgotPasswordValidator = typeof forgotPasswordValidator._type;
export type VerifyForgotPasswordOtpValidator =
  typeof verifyForgotPasswordOtpValidator._type;
export type ResetPasswordValidator = typeof resetPasswordValidator._type;
export type IsUserNameAvailableValidator =
  typeof isUserNameAvailableValidator._type;
export type GetUserNameSuggestionsValidator =
  typeof getUserNameSuggestionsValidator._type;
export type VerifyIndividualContactInfoValidator =
  typeof verifyIndividualContactInfoValidator._type;
export type VerifyOrganizationContactInfoValidator =
  typeof verifyOrganizationContactInfoValidator._type;
// export type VerifyAddressInfoValidator =
//   typeof verifyAddressInfoValidator._type;
// export type VerifyUserBankAccountValidator =
//   typeof verifyUserBankAccountValidator._type;
// export type VerifyCacDocument = typeof verifyCacDocument._type;
// export type FetchTransactionHistoryValidator = z.infer<
//   typeof fetchTransactionHistoryValidator
// >;
