import { Request, Response } from 'express';
import Logger from '../../config/logger';
import {
  CreateUserValidator,
  // GetUserNameSuggestionsValidator,
  // IsUserNameAvailableValidator,
  // UpdateIndividualContactInfoValidator,
  // UpdateOrganizationContactInfoValidator,
  // VerifyOrganizationRepInfoValidator,
  // VerifyAccountValidator,
  // VerifyAddressInfoValidator,
  // VerifyIndividualContactInfoValidator,
  // VerifyOrganizationContactInfoValidator,
  VerifyPhoneNumberOtpValidator,
  // FetchTransactionHistoryValidator,
} from './validation';
import { ResponseHandler } from '../../shared/helpers';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './service';
import { UserTokenType } from '../../shared/types/user/userAccount';

const _logger = new Logger('User.Controller');

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Creating a new user');
      const payload = req.body as CreateUserValidator;

      const user = await UserService.createUser(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User created successfully',
        code: StatusCodes.CREATED,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when creating a user',
        err,
      );
      throw err;
    }
  };

  static sendPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Sending phone number otp');
      const payload = req.body as VerifyPhoneNumberOtpValidator;

      const otp = await UserService.sendPhoneNumberOtp(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number otp sent successfully',
        code: StatusCodes.OK,
        data: otp,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when sending phone number otp',
        err,
      );
      throw err;
    }
  };

  static verifyPhoneNumberOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Verifying phone number otp');
      const payload = req.body as VerifyPhoneNumberOtpValidator;

      const user = await UserService.verifyPhoneNumberOtp(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Phone number verified successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when verifying phone number otp',
        err,
      );
      throw err;
    }
  };

  // static updateIndividualContactInfo = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Updating individual contact info');
  //     const payload = req.body as UpdateIndividualContactInfoValidator;
  //
  //     // const user = await UserService.updateIndividualContactInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Individual contact info updated successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when updating individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyIndividualContactInfo = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying individual contact info');
  //     const payload = req.body as VerifyIndividualContactInfoValidator;
  //
  //     const user = await UserService.verifyIndividualContactInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Individual contact info verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyAddressInfo = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying user address info');
  //     const payload = req.body as VerifyAddressInfoValidator;
  //
  //     const user = await UserService.verifyUserAddressInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Individual address info verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  // static verifyOrganizationRepInfo = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying user address info');
  //     const payload = req.body as VerifyOrganizationRepInfoValidator;
  //     const user = await UserService.verifyOrganizationRepInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Organization address info verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying organization representative info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static updateOrganizationContactInfo = async (
  //   req: Request,
  //   res: Response,
  // ) => {
  //   try {
  //     _logger.log('[UserController]::Updating organization contact info');
  //     const payload = req.body as UpdateOrganizationContactInfoValidator;
  //
  //     const user = await UserService.updateOrganizationContactInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Organization contact info updated successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when updating organization contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyOrganizationContactInfo = async (
  //   req: Request,
  //   res: Response,
  // ) => {
  //   try {
  //     _logger.log('[UserController]::Verifying organization contact info');
  //     const payload = req.body as VerifyOrganizationContactInfoValidator;
  //
  //     const user = await UserService.verifyOrganizationContactInfo(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Organization contact info updated successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying organization contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
  // static verifyAccountDocuments = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying account');
  //     const payload = req.body as VerifyAccountValidator;
  //
  //     const verified = await UserService.verifyAccount(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Account verified successfully',
  //       code: StatusCodes.OK,
  //       data: verified,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying account',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
  // static updateAccountDocuments = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying account');
  //     const payload = req.body as VerifyAccountValidator;
  //
  //     const user = await UserService.updateAccountDocuments(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Account verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying account',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  static login = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Logging in user');
      const payload = req.body;

      const user = await UserService.login(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User logged in successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong while logging in',
        err,
      );
      throw err;
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Getting user by id');
      const { id } = req.user as UserTokenType;

      const user = await UserService.getUserById(id);
      const response = new ResponseHandler(req, res);
      response.success({
        message: 'User retrieved successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when getting user by id',
        err,
      );
      throw err;
    }
  };

  static forgotPassword = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Forgot password');
      const payload = req.body;

      const otp = await UserService.forgotPassword(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Password reset otp sent successfully',
        code: StatusCodes.OK,
        data: otp,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when sending password reset link',
        err,
      );
      throw err;
    }
  };

  static verifyForgotPasswordOtp = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Verifying forgot password otp');
      const payload = req.body;

      const user = await UserService.verifyForgotPasswordOtp(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Forgot password otp verified successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when verifying forgot password otp',
        err,
      );
      throw err;
    }
  };

  static resetPassword = async (req: Request, res: Response) => {
    try {
      _logger.log('[UserController]::Resetting password');
      const payload = req.body;

      const user = await UserService.resetPassword(payload);

      const response = new ResponseHandler(req, res);
      response.success({
        message: 'Password reset successfully',
        code: StatusCodes.OK,
        data: user,
      });
    } catch (err) {
      _logger.error(
        '[UserController]::Something went wrong when resetting password',
        err,
      );
      throw err;
    }
  };

  // static checkIfUserNameIsAvailable = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Checking if username is available');
  //     const { userName } = req.query as unknown as IsUserNameAvailableValidator;
  //
  //     const isAvailable = await UserService.checkIfUserNameIsAvailable(
  //       userName,
  //     );
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: isAvailable.isAvailable
  //         ? 'Username is available'
  //         : 'Username is not available',
  //       code: StatusCodes.OK,
  //       data: isAvailable,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when checking if username is available',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static getUserNameSuggestions = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Getting username suggestions');
  //     const { fullName } =
  //       req.query as unknown as GetUserNameSuggestionsValidator;
  //
  //     const suggestions = await UserService.getUserNameSuggestions(fullName);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Username suggestions retrieved successfully',
  //       code: StatusCodes.OK,
  //       data: suggestions,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when getting username suggestions',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static getBanks = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Getting banks');
  //     const banks = await UserService.getBanks();
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Banks retrieved successfully',
  //       code: StatusCodes.OK,
  //       data: banks,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when getting banks',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
  // static verifyUserBankAccount = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Verifying user bank account');
  //     const payload = req.body;
  //
  //     const user = await UserService.verifyUserBankAccount(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Bank account verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying user bank account',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
  // static verifyOrganizationCacDocument = async (
  //   req: Request,
  //   res: Response,
  // ) => {
  //   try {
  //     _logger.log('[UserController]::Verifying organization cac document');
  //     const payload = req.body;
  //
  //     const user = await UserService.verifyCacDocument(payload);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Cac document verified successfully',
  //       code: StatusCodes.OK,
  //       data: user,
  //     });
  //   } catch (err) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when verifying cac document',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static fetchTransactionHistory = async (req: Request, res: Response) => {
  //   try {
  //     _logger.log('[UserController]::Fetching transaction history');
  //     const { id } = req.user as UserTokenType;
  //     const query = req.query as unknown as FetchTransactionHistoryValidator;
  //
  //     const transactions = await UserService.fetchTransactionHistory(id, query);
  //
  //     const response = new ResponseHandler(req, res);
  //     response.success({
  //       message: 'Transaction history retrieved successfully',
  //       code: StatusCodes.OK,
  //       data: transactions,
  //     });
  //   } catch (error) {
  //     _logger.error(
  //       '[UserController]::Something went wrong when fetching transaction history',
  //       error,
  //     );
  //     throw error;
  //   }
  // };
}
