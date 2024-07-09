import express from 'express';
import { ValidationMiddleware } from '../../shared/validators/middleware';
import {
  createUserValidator,
  forgotPasswordValidator,
  // getUserNameSuggestionsValidator,
  // isUserNameAvailableValidator,
  loginValidator,
  resetPasswordValidator,
  sendPhoneNumberOtpValidator,
  // updateIndividualContactInfoValidator,
  // updateOrganizationContactInfoValidator,
  // verifyOrganizationRepInfoValidator,
  // verifyAccountValidator,
  // verifyAddressInfoValidator,
  // verifyCacDocument,
  verifyForgotPasswordOtpValidator,
  // verifyIndividualContactInfoValidator,
  // verifyOrganizationContactInfoValidator,
  verifyPhoneNumberOtpValidator,
  // verifyUserBankAccountValidator,
  // fetchTransactionHistoryValidator,
} from './validation';
import { tryCatch } from '../../shared/helpers';
import { UserController } from './user.controller';
import { UserAuthMiddleware } from './middleware/auth.middleware';

const router = express.Router();

const { validateRequest } = ValidationMiddleware;
const { tokenGuard } = UserAuthMiddleware;

// Onboarding
router.post(
  '/create',
  validateRequest(createUserValidator),
  tryCatch(UserController.createUser),
);

router.post(
  '/send/phone-number-otp',
  validateRequest(sendPhoneNumberOtpValidator),
  tryCatch(UserController.sendPhoneNumberOtp),
);

router.post(
  '/verify-phone-number-otp',
  validateRequest(verifyPhoneNumberOtpValidator),
  tryCatch(UserController.verifyPhoneNumberOtp),
);

// router.post(
//   '/verify-individual-contact-info',
//   validateRequest(verifyIndividualContactInfoValidator),
//   tryCatch(UserController.verifyIndividualContactInfo),
// );
//
// router.post(
//   '/verify-address',
//   validateRequest(verifyAddressInfoValidator),
//   tryCatch(UserController.verifyAddressInfo),
// );
//
// router.put(
//   '/update-individual-contact-info',
//   validateRequest(updateIndividualContactInfoValidator),
//   tryCatch(UserController.updateIndividualContactInfo),
// );
//
// router.post(
//   `/verify-organization-contact-info`,
//   validateRequest(verifyOrganizationContactInfoValidator),
//   tryCatch(UserController.verifyOrganizationContactInfo),
// );
//
// router.post(
//   `/verify-organization-rep-info`,
//   validateRequest(verifyOrganizationRepInfoValidator),
//   tryCatch(UserController.verifyOrganizationRepInfo),
// );
//
// router.put(
//   `/update-organization-contact-info`,
//   validateRequest(updateOrganizationContactInfoValidator),
//   tryCatch(UserController.updateOrganizationContactInfo),
// );
//
// router.post(
//   '/verify-user-documents',
//   validateRequest(verifyAccountValidator),
//   tryCatch(UserController.verifyAccountDocuments),
// );
//
// router.put(
//   '/update-user-documents',
//   validateRequest(verifyAccountValidator),
//   tryCatch(UserController.updateAccountDocuments),
// );

// Login
router.post(
  '/login',
  validateRequest(loginValidator),
  tryCatch(UserController.login),
);

router.get('/me', tokenGuard, tryCatch(UserController.getUserById));

router.post(
  '/forgot-password',
  validateRequest(forgotPasswordValidator),
  tryCatch(UserController.forgotPassword),
);

router.post(
  '/verify-forgot-password-otp',
  validateRequest(verifyForgotPasswordOtpValidator),
  tryCatch(UserController.verifyForgotPasswordOtp),
);

router.post(
  '/reset-password',
  validateRequest(resetPasswordValidator),
  tryCatch(UserController.resetPassword),
);
//
// router.get(
//   '/username-is-available',
//   validateRequest(isUserNameAvailableValidator),
//   tryCatch(UserController.checkIfUserNameIsAvailable),
// );
//
// router.get(
//   '/username-suggestions',
//   validateRequest(getUserNameSuggestionsValidator),
//   tryCatch(UserController.getUserNameSuggestions),
// );
//
// router.get('/get-banks', tryCatch(UserController.getBanks));
//
// router.post(
//   '/verify-bank-account',
//   validateRequest(verifyUserBankAccountValidator),
//   tryCatch(UserController.verifyUserBankAccount),
// );

// router.post(
//   '/verify-cac-document',
//   validateRequest(verifyCacDocument),
//   tryCatch(UserController.verifyOrganizationCacDocument),
// );
//
// router.get(
//   '/transaction-history',
//   tokenGuard,
//   validateRequest(fetchTransactionHistoryValidator),
//   tryCatch(UserController.fetchTransactionHistory),
// );

export const userRouter = router;
