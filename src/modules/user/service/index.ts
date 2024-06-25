import { ApiError } from '../../../shared/utils/api.error';
import Logger from '../../../config/logger';
import { UserRepository } from '../repository';
import {
  CreateUserValidator,
  ForgotPasswordValidator,
  LoginValidator,
  ResetPasswordValidator,
  SendPhoneNumberOtpValidator,
  UpdateIndividualContactInfoValidator,
  UpdateOrganizationContactInfoValidator,
  VerifyOrganizationRepInfoValidator,
  VerifyAccountValidator,
  VerifyAddressInfoValidator,
  VerifyCacDocument,
  VerifyForgotPasswordOtpValidator,
  VerifyIndividualContactInfoValidator,
  VerifyOrganizationContactInfoValidator,
  VerifyPhoneNumberOtpValidator,
  VerifyUserBankAccountValidator,
  FetchTransactionHistoryValidator,
} from '../validation';
import { StatusCodes } from 'http-status-codes';
import { GenericHelper } from '../../../shared/helpers/generic.helper';
import Env from '../../../shared/utils/env';
// import { OnboardingVerifiedStatus } from '../../../shared/enums';
import { UserAccountDTO } from '../../../shared/types/user/userAccount';
import * as jwt from 'jsonwebtoken';

const _logger = new Logger('User.Service');
export class UserService {
  static createUser = async (request: CreateUserValidator): Promise<any> => {
    try {
      const { email, phoneNumber, userName } = request;
      const userExists = await UserRepository.checkIfUserExists(
        email,
        phoneNumber,
        userName,
      );
      if (userExists) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'User with email or phone number or user name already exists',
        );
      }

      const { password } = request;
      const { hashedText } = await GenericHelper.hashText(
        password,
        Env.get('SALT_ROUNDS'),
      );

      request.password = hashedText;

      const user = await UserRepository.createUser(request);
      const wallet = await UserRepository.createWallet(user.id);
      _logger.log(
        `Wallet created successfully for user with id: ${
          user.id
        } - ${JSON.stringify(wallet)}`,
      );
      return user;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when creating a user',
        err,
      );
      throw err;
    }
  };

  static sendPhoneNumberOtp = async (
    request: SendPhoneNumberOtpValidator,
  ): Promise<any> => {
    try {
      const { phoneNumber } = request;
      const user = await UserRepository.getUserByPhoneNumber(phoneNumber);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const otp = GenericHelper.generateRandomNumber(6);
      const hashedOtp = GenericHelper.hashOtp(otp, Env.get('SECRET'), '2m');
      await UserRepository.storeOtp(user.id, hashedOtp);
      return { otp, id: user.id };
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when sending phone number otp',
      );
      throw err;
    }
  };

  static verifyPhoneNumberOtp = async (
    request: VerifyPhoneNumberOtpValidator,
  ): Promise<UserAccountDTO> => {
    try {
      const { phoneNumber, otp } = request;
      const user = await UserRepository.getUserByPhoneNumber(phoneNumber);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const isOtpValid = GenericHelper.verifyOtp(
        otp,
        user.otp as string,
        Env.get('SECRET'),
      );
      if (!isOtpValid) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP');
      }

      const userDetails =
        await UserRepository.updateOnboardingVerificationStatus(
          user.id,
          OnboardingVerifiedStatus.PhoneNumber,
        );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otp: _, ...userInfo } = userDetails;
      return userInfo;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying phone number otp',
      );
      throw err;
    }
  };

  static updateIndividualContactInfo = async (
    request: UpdateIndividualContactInfoValidator,
  ): Promise<UserAccountDTO> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.updateIndividualContactInfo(request);

      const updatedUser =
        await UserRepository.updateOnboardingVerificationStatus(
          user.id,
          OnboardingVerifiedStatus.Contact,
        );
      return updatedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when updating individual contact info',
        err,
      );
      throw err;
    }
  };

  static verifyIndividualContactInfo = async (
    request: VerifyIndividualContactInfoValidator,
  ): Promise<void> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.verifyIndividualContactInfo(request, user);
      return;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying individual contact info',
        err,
      );
      throw err;
    }
  };

  static verifyUserAddressInfo = async (
    request: VerifyAddressInfoValidator,
  ): Promise<any> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const updatedUser = await UserRepository.verifyAddressInfo(request, user);
      return updatedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying individual contact info',
        err,
      );
      throw err;
    }
  };
  static verifyOrganizationRepInfo = async (
    request: VerifyOrganizationRepInfoValidator,
  ): Promise<any> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const updatedUser = await UserRepository.verifyOrganizationRepInfo(
        request,
        user,
      );
      return updatedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying organization representative info',
        err,
      );
      throw err;
    }
  };

  static updateOrganizationContactInfo = async (
    request: UpdateOrganizationContactInfoValidator,
  ): Promise<UserAccountDTO> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.updateOrganizationContactInfo(request);

      const updatedUser =
        await UserRepository.updateOnboardingVerificationStatus(
          user.id,
          OnboardingVerifiedStatus.Contact,
        );
      return updatedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when updating organization contact info',
      );
      throw err;
    }
  };

  static verifyOrganizationContactInfo = async (
    request: VerifyOrganizationContactInfoValidator,
  ): Promise<void> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.verifyOrganizationContactInfo(request, user);
      return;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying organization contact info',
      );
      throw err;
    }
  };

  static verifyAccount = async (
    request: VerifyAccountValidator,
  ): Promise<void> => {
    try {
      _logger.log(`Verifying user documents with request: ${request}`);
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const response = await UserRepository.verifyUserDocuments(request, user);
      _logger.log('User documents verified successfully');
      return response;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying account',
      );
      throw err;
    }
  };

  static updateAccountDocuments = async (
    request: VerifyAccountValidator,
  ): Promise<UserAccountDTO> => {
    try {
      const { id } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.updateUserDocuments(request);

      return user;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying account',
      );
      throw err;
    }
  };

  static login = async (request: LoginValidator): Promise<any> => {
    try {
      const { email, password } = request;
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const isPasswordValid = await GenericHelper.compareHash(
        password,
        user.password as string,
      );
      if (!isPasswordValid) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid password');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userName: user.userName,
          fullName: user.fullName,
          userType: user.userType,
          hasVerifiedPhoneNumber: user.hasVerifiedPhoneNumber,
          hasVerifiedContact: user.hasVerifiedContact,
          hasVerifiedNin: user.hasVerifiedNin,
          hasVerifiedDriversLicense: user.hasVerifiedDriversLicense,
          hasVerifiedPassport: user.hasVerifiedPassport,
          hasVerifiedBankAccount: user.hasVerifiedBankAccount,
          hasVerifiedBvn: user.hasVerifiedBvn,
          hasVerifiedAddress: user.hasVerifiedAddress,
          hasVerifiedCac: user.hasVerifiedCac,
        },
        Env.get('SECRET') as string,
        { expiresIn: '1d', algorithm: 'HS256' },
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userDetails } = user;
      return { ...userDetails, token };
    } catch (err) {
      _logger.error('[UserService]::Something went wrong when logging in');
      throw err;
    }
  };

  static getUserById = async (userId: string): Promise<any> => {
    try {
      const user = await UserRepository.getUserById(userId);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      return {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
        fullName: user.fullName,
        userType: user.userType,
        hasVerifiedPhoneNumber: user.hasVerifiedPhoneNumber,
        hasVerifiedContact: user.hasVerifiedContact,
        hasVerifiedNin: user.hasVerifiedNin,
        hasVerifiedDriversLicense: user.hasVerifiedDriversLicense,
        hasVerifiedPassport: user.hasVerifiedPassport,
        hasVerifiedBankAccount: user.hasVerifiedBankAccount,
        hasVerifiedBvn: user.hasVerifiedBvn,
        hasVerifiedAddress: user.hasVerifiedAddress,
        hasVerifiedCac: user.hasVerifiedCac,
      };
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when getting user by id',
        err,
      );
      throw err;
    }
  };

  static forgotPassword = async (
    request: ForgotPasswordValidator,
  ): Promise<any> => {
    try {
      const { email } = request;
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const otp = GenericHelper.generateRandomNumber(6);
      const hashedOtp = GenericHelper.hashOtp(otp, Env.get('SECRET'), '2m');
      await UserRepository.storeOtp(user.id, hashedOtp);
      return { otp, id: user.id };
    } catch (err) {
      _logger.error('[UserService]::Something went wrong when forgot password');
      throw err;
    }
  };

  static verifyForgotPasswordOtp = async (
    request: VerifyForgotPasswordOtpValidator,
  ): Promise<any> => {
    try {
      const { email, otp } = request;
      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      const isOtpValid = GenericHelper.verifyOtp(
        otp,
        user.otp as string,
        Env.get('SECRET'),
      );
      if (!isOtpValid) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid OTP');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { otp: _, ...userDetails } = user;
      return userDetails;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying forgot password otp',
      );
      throw err;
    }
  };

  static resetPassword = async (
    request: ResetPasswordValidator,
  ): Promise<any> => {
    try {
      const { email, password } = request;
      const { hashedText } = await GenericHelper.hashText(
        password,
        Env.get('SALT_ROUNDS'),
      );

      const user = await UserRepository.getUserByEmail(email);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      await UserRepository.resetPassword(user.id, hashedText);

      return;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when resetting password',
      );
      throw err;
    }
  };

  static checkIfUserNameIsAvailable = async (
    userName: string,
  ): Promise<{ isAvailable: boolean }> => {
    try {
      const user = await UserRepository.getUserByUserName(userName);
      return { isAvailable: !user };
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when checking if user name is available',
      );
      throw err;
    }
  };

  static getUserNameSuggestions = async (
    fullName: string,
  ): Promise<string[]> => {
    try {
      const cleanFullName = fullName
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .toLowerCase();
      const suggestions = [];
      _logger.log(
        `[UserService]::Getting user name suggestions for ${fullName}`,
      );
      _logger.log(`[UserService]::Clean full name: ${cleanFullName}`);

      // Check if fullName consists of more than one name
      const names = cleanFullName.split(' ');
      _logger.log(`[UserService]::Names: ${names}`);
      if (names.length > 1) {
        const cleanFirstName = names[0];
        const cleanLastName = names[names.length - 1];

        suggestions.push(`${cleanFirstName}${cleanLastName}`);
        suggestions.push(`${cleanFirstName}.${cleanLastName}`);
        suggestions.push(`${cleanFirstName}_${cleanLastName}`);
        suggestions.push(`${cleanFirstName}-${cleanLastName}`);
        suggestions.push(`${cleanFirstName}${cleanLastName.slice(0, 1)}`);
        suggestions.push(
          `${cleanFirstName}${cleanLastName.slice(0)}${cleanLastName.slice(
            -1,
          )}`,
        );
        suggestions.push(`${cleanFirstName}${cleanLastName.slice(-2)}`);
        suggestions.push(
          `${cleanFirstName}${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(
          `${cleanFirstName}.${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(
          `${cleanFirstName}_${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(
          `${cleanFirstName}-${GenericHelper.generateRandomNumber(2)}`,
        );
      } else {
        const cleanName = names[0];
        _logger.log(`[UserService]::Clean name: ${cleanName}`);
        suggestions.push(`${cleanName}`);
        suggestions.push(
          `${cleanName}${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(
          `${cleanName}.${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(
          `${cleanName}_${GenericHelper.generateRandomNumber(2)}`,
        );
        suggestions.push(`${cleanName}_`);
      }

      const availableSuggestions = await UserRepository.getUserNameSuggestions(
        suggestions,
      );
      return availableSuggestions;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when getting user name suggestions',
      );
      throw err;
    }
  };

  static getBanks = async (): Promise<any> => {
    try {
      const banks = await UserRepository.getBanksPaystack();
      return banks;
    } catch (err) {
      _logger.error(
        '[UserService ]::Something went wrong when getting banks',
        err,
      );
      throw err;
    }
  };

  static verifyUserBankAccount = async (
    request: VerifyUserBankAccountValidator,
  ): Promise<any> => {
    try {
      const { accountNumber, bankCode, bankName, id, env } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }
      const { fullName } = user;

      _logger.log(
        `Verifying user bank account with request: ${request}, user name: ${fullName} and env: ${env}`,
      );
      const { accountName } = await UserRepository.verifyBankAccountPaystack(
        accountNumber,
        bankCode,
      );

      await UserRepository.updateBankAccountDetails(
        id,
        accountName,
        accountNumber,
        bankCode,
        bankName,
      );

      const verifiedUser =
        await UserRepository.updateOnboardingVerificationStatus(
          user.id,
          OnboardingVerifiedStatus.BankAccount,
        );

      return verifiedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying user bank account',
        err,
      );
      throw err;
    }
  };

  static verifyCacDocument = async (
    request: VerifyCacDocument,
  ): Promise<any> => {
    try {
      const { id, documentId, documentType, env } = request;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
      }

      _logger.log(
        `Verifying user cac document with request: ${JSON.stringify(request)}}`,
      );

      await UserRepository.verifyCac(documentId, documentType, env);

      const verifiedUser =
        await UserRepository.updateOnboardingVerificationStatus(
          user.id,
          OnboardingVerifiedStatus.Cac,
        );

      return verifiedUser;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying user cac document',
        err,
      );
      throw err;
    }
  };

  static fetchTransactionHistory = async (
    id: string,
    body: FetchTransactionHistoryValidator,
  ): Promise<any> => {
    try {
      _logger.log(
        `Fetching transaction history for user with id: ${id} with body: ${JSON.stringify(
          body,
        )}  `,
      );

      const transactions = await UserRepository.fetchTransactionHistory(
        id,
        body,
      );

      return transactions;
    } catch (error) {
      _logger.error(
        '[UserService::fetchTransactionHistory ] Something went wrong when fetching transaction history',
        error,
      );
      throw error;
    }
  };
}
