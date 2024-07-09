import { UserAccount } from '../../../shared/types/user/userAccount';
import { sqlQuest } from '../../../config/database';
import Logger from '../../../config/logger';
import { userQueries } from '../queries';
import {
  CreateUserValidator,
  ForgotPasswordValidator,
  LoginValidator,
  ResetPasswordValidator,
  SendPhoneNumberOtpValidator,
  VerifyForgotPasswordOtpValidator,
  VerifyPhoneNumberOtpValidator,
  // UpdateIndividualContactInfoValidator,
  // UpdateOrganizationContactInfoValidator,
  // VerifyOrganizationRepInfoValidator,
  // // VerifyAccountValidator,
  // VerifyAddressInfoValidator,
  // VerifyIndividualContactInfoValidator,
  // VerifyOrganizationContactInfoValidator,
  // FetchTransactionHistoryValidator,
} from '../validation';
import { GenericHelper } from '../../../shared/helpers/generic.helper';
import // CacDocumentType,
// OnboardingVerifiedStatus,
// VerifyDocument,
'../../../shared/enums';
import Env from '../../../shared/utils/env';
import { UserRepository } from '../repository';
import { StatusCodes } from 'http-status-codes';
// import { VerifyMeService } from '../../../shared/services/verifyme/verifyme';
// import { HttpService } from '../../../shared/services/http';
import { ApiError } from '../../../shared/utils/api.error';
import { UserAccountDTO } from '../../../shared/types/user/userAccount';
// import { PayStackService } from '../../../shared/services/paystack/paystack';
import * as jwt from 'jsonwebtoken';

const _logger = new Logger('User.Repository');
export class UserService {
  static checkIfUserExists = async (
    email: string,
    phoneNumber: string,
    userName: string,
  ): Promise<UserAccount> => {
    try {
      const userExists = await sqlQuest.oneOrNone(
        userQueries.checkIfUserExists,
        [email, phoneNumber, userName],
      );
      return userExists;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when checking if user exists',
        err,
      );
      throw err;
    }
  };

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
      return user;
    } catch (err) {
      _logger.error(
        '[UserService]::Something went wrong when verifying phone number otp',
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

      const { password: _, ...userDetails } = user;
      return { ...userDetails, token };
    } catch (err) {
      _logger.error('[UserService]::Something went wrong when logging in');
      throw err;
    }
  };

  static getUserById = async (userId: string): Promise<UserAccount> => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.getUserById, [userId]);
      _logger.log(`User from get user by id: ${JSON.stringify(user)}`);
      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when getting user by id',
        err,
      );
      throw err;
    }
  };

  // static updateOnboardingVerificationStatus = async (
  //   userId: string,
  //   type: OnboardingVerifiedStatus,
  // ): Promise<UserAccount> => {
  //   try {
  //     const status = await sqlQuest.one(
  //       userQueries.updateOnboardingVerificationStatus,
  //       [userId, type],
  //     );
  //     return status;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when updating onboarding verification status',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static updateIndividualContactInfo = async (
  //   request: UpdateIndividualContactInfoValidator,
  // ): Promise<void> => {
  //   try {
  //     const {
  //       id,
  //       streetName,
  //       stateName,
  //       lgaName,
  //       bankName,
  //       bvnNumber,
  //       accountNumber,
  //     } = request;
  //
  //     await sqlQuest.none(userQueries.updateIndividualContactInfo, [
  //       id,
  //       streetName,
  //       lgaName,
  //       stateName,
  //       bankName,
  //       bvnNumber,
  //       accountNumber,
  //     ]);
  //     return;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when updating individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyIndividualContactInfo = async (
  //   request: VerifyIndividualContactInfoValidator,
  //   user: UserAccount,
  // ): Promise<void> => {
  //   try {
  //     const { bvnNumber } = request;
  //     const { fullName, phoneNumber } = user;
  //     const [firstName, lastName] = fullName.split(' ');
  //
  //     const verifyRequest = VerifyMeService.verifyBvn(
  //       bvnNumber,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       'test',
  //     );
  //
  //     const verifyResponse = await HttpService.req(verifyRequest);
  //     if (verifyResponse?.status !== 200) {
  //       throw new ApiError(verifyResponse?.status, verifyResponse?.message);
  //     }
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyAddressInfo = async (
  //   request: VerifyAddressInfoValidator,
  //   user: UserAccount,
  // ): Promise<any> => {
  //   try {
  //     const { stateName, streetName, lgaName, city } = request;
  //
  //     const updatedUser = await sqlQuest.one(userQueries.updateAddressInfo, [
  //       user.id,
  //       streetName,
  //       lgaName,
  //       stateName,
  //       city,
  //     ]);
  //     return updatedUser;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  // static verifyOrganizationRepInfo = async (
  //   request: VerifyOrganizationRepInfoValidator,
  //   user: UserAccount,
  // ): Promise<any> => {
  //   try {
  //     const { authorizedRepName, officialEmailAddress, staffLoanEligibility } =
  //       request;
  //
  //     const updatedUser = await sqlQuest.one(
  //       userQueries.updateOrganizationRepInfo,
  //       [
  //         user.id,
  //         authorizedRepName,
  //         officialEmailAddress,
  //         staffLoanEligibility,
  //       ],
  //     );
  //     return updatedUser;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying organization representative info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyOrganizationContactInfo = async (
  //   request: VerifyOrganizationContactInfoValidator,
  //   user: UserAccount,
  // ): Promise<void> => {
  //   try {
  //     const { bnNumber, rcNumber } = request;
  //     const { fullName, phoneNumber } = user;
  //     const [firstName, lastName] = fullName.split(' ');
  //
  //     const bvnRequest = VerifyMeService.verifyBvn(
  //       bnNumber,
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       'test',
  //     );
  //
  //
  //
  //     const bvnResponse = await HttpService.req(bvnRequest);
  //     if (bvnResponse?.status !== 200) {
  //       throw new ApiError(bvnResponse?.status, bvnResponse?.message);
  //     }
  //
  //
  //     return;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying individual contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static updateOrganizationContactInfo = async (
  //   request: UpdateOrganizationContactInfoValidator,
  // ): Promise<void> => {
  //   try {
  //     const {
  //       id,
  //       streetName,
  //       stateName,
  //       lgaName,
  //       rcNumber,
  //       bnNumber,
  //       bankName,
  //       accountNumber,
  //     } = request;
  //
  //     await sqlQuest.none(userQueries.updateOrganizationContactInfo, [
  //       id,
  //       streetName,
  //       lgaName,
  //       stateName,
  //       rcNumber,
  //       bnNumber,
  //       bankName,
  //       accountNumber,
  //     ]);
  //     return;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when updating organization contact info',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static updateUserDocuments = async (
  //   request: VerifyAccountValidator,
  // ): Promise<void> => {
  //   try {
  //     const { id, verificationType, document } = request;
  //
  //     await sqlQuest.none(userQueries.updateUserDocuments, [
  //       id,
  //       verificationType,
  //       document,
  //     ]);
  //     return;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when updating user documents',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyDriversLicense = async (
  //   document: string,
  //   fullName: string,
  //   env: string,
  // ): Promise<any> => {
  //   try {
  //     const [firstname, lastname] = fullName.split(' ');
  //     const request = VerifyMeService.verifyDriversLicense(
  //       document,
  //       firstname,
  //       lastname,
  //       env,
  //     );
  //     _logger.log(`Drivers license request: ${JSON.stringify(request)}`);
  //     return this.requestCall(request);
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying drivers license',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyNin = async (
  //   document: string,
  //   fullName: string,
  //   env: string,
  // ): Promise<any> => {
  //   try {
  //     const [firstName, lastName] = fullName.split(' ');
  //     const request = VerifyMeService.verifyNin(
  //       document,
  //       firstName,
  //       lastName,
  //       env,
  //     );
  //     _logger.log(`Nin request: ${JSON.stringify(request)}`);
  //
  //     return this.requestCall(request);
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying nin',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
  // private static requestCall = async (request: any): Promise<any> => {
  //   const response = await HttpService.req(request);
  //   _logger.log(`Nin request made`);
  //   if (response?.status !== 200) {
  //     const { status, message } = response;
  //     throw new ApiError(status, message);
  //   }
  //   const { id, summary, status } = response.data;
  //   return { id, summary, status };
  // };
  //
  // static verifyBvn = async (
  //   document: string,
  //   fullName: string,
  //   phoneNumber: string,
  //   env: string,
  // ): Promise<any> => {
  //   try {
  //     const [firstname, lastname] = fullName.split(' ');
  //     const request = VerifyMeService.verifyBvn(
  //       document,
  //       firstname,
  //       lastname,
  //       phoneNumber,
  //       env,
  //     );
  //     _logger.log(`Bvn request: ${JSON.stringify(request)}`);
  //
  //     return this.requestCall(request);
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying bvn',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyPassport = async (
  //   document: string,
  //   fullName: string,
  //   env: string,
  // ): Promise<any> => {
  //   try {
  //     const [firstName, lastName] = fullName.split(' ');
  //     const request = VerifyMeService.verifyPassport(
  //       document,
  //       firstName,
  //       lastName,
  //       env,
  //     );
  //     return this.requestCall(request);
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying passport',
  //       err,
  //     );
  //     throw err;
  //   }
  // };
  //
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

  // static getUserNameSuggestions = async (
  //   suggestions: string[],
  // ): Promise<string[]> => {
  //   try {
  //     const available = await sqlQuest.manyOrNone(
  //       userQueries.getUserNameSuggestions,
  //       [suggestions],
  //     );
  //     return available.map(
  //       (suggestion: { suggestion: string }) => suggestion.suggestion,
  //     );
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when getting username suggestions',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static getBanks = async () => {
  //   try {
  //     const request = VerifyMeService.getBanks();
  //     const response = await HttpService.req(request);
  //     if (response?.status !== 200) {
  //       throw new ApiError(response?.status, response?.message);
  //     }
  //     const { data: banks } = response;
  //     return banks;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when getting banks',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyBankAccount = async (
  //   accountNumber: string,
  //   bankCode: string,
  //   fullName: string,
  //   env: string,
  // ) => {
  //   try {
  //     const [firstname, lastname] = fullName.split(' ');
  //     const request = VerifyMeService.verifyBankAccountDetails(
  //       firstname,
  //       lastname,
  //       accountNumber,
  //       bankCode,
  //       env,
  //     );
  //     const response = await HttpService.req(request);
  //     if (response?.status !== 200) {
  //       throw new ApiError(response?.status, response?.message);
  //     }
  //     const { id, metadata, nuban, status } = response.data;
  //     const { accountName, accountCurrency } = nuban;
  //     return { id, ...metadata, accountName, accountCurrency, status };
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying bank account',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static verifyCac = async (
  //   document: string,
  //   type: CacDocumentType,
  //   env: string,
  // ): Promise<any> => {
  //   try {
  //     const request = VerifyMeService.verifyCac(document, type, env);
  //     const response = await HttpService.req(request);
  //     if (response?.status !== 200) {
  //       throw new ApiError(response?.status, response?.message);
  //     }
  //     _logger.log(
  //       `Cac verified successfully - ${document} - ${JSON.stringify(
  //         response.data,
  //       )}`,
  //     );
  //     const { id, summary, status } = response.data;
  //     return { id, summary, status };
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying cac document',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static createWallet = async (userId: string) => {
  //   try {
  //     const wallet = await sqlQuest.one(userQueries.createWallet, [
  //       GenericHelper.generateId(),
  //       userId,
  //     ]);
  //     return wallet;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when creating wallet',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static fetchTransactionHistory = async (
  //   id: string,
  //   {
  //     date,
  //     type,
  //     search,
  //     status,
  //     page = 1,
  //     limit = 10,
  //   }: FetchTransactionHistoryValidator,
  // ) => {
  //   try {
  //     _logger.log(
  //       `[UserRepository::fetchTransactionHistory]::Fetching transaction history for ${id} with query params - ${JSON.stringify(
  //         { date, type, search, page, limit },
  //       )},`,
  //     );
  //
  //     const paramValues: string[] = [];
  //     const conditions: string[] = [];
  //
  //     paramValues.push(id);
  //
  //     if (search) {
  //       paramValues.push(search);
  //       conditions.push(
  //         `(
  //         "transactionCategory" ILIKE '%' || $${paramValues.length} || '%'
  //         OR "transactionDescription" ILIKE '%' || $${paramValues.length} || '%'
  //         OR "transactionStatus" ILIKE '%' || $${paramValues.length} || '%'
  //         OR "planName" ILIKE '%' || $${paramValues.length} || '%'
  //         )`,
  //       );
  //     }
  //
  //     if (status) {
  //       paramValues.push(status);
  //       conditions.push(`"transactionStatus" = $${paramValues.length}`);
  //     }
  //
  //     if (type) {
  //       paramValues.push(type);
  //       conditions.push(`(
  //         "transactionCategory" = $${paramValues.length}
  //         OR
  //         "savingsType" = $${paramValues.length}
  //         )`);
  //     }
  //
  //     if (date) {
  //       paramValues.push(date.toString());
  //       conditions.push(`(
  //         EXTRACT(DAY FROM "createdAt"::date) = EXTRACT(DAY FROM $${paramValues.length}::date)
  //         AND EXTRACT(MONTH FROM "createdAt"::date) = EXTRACT(MONTH FROM $${paramValues.length}::date)
  //         AND EXTRACT(YEAR FROM "createdAt"::date) = EXTRACT(YEAR FROM $${paramValues.length}::date)
  //         )`);
  //     }
  //
  //     const whereClause =
  //       conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
  //
  //     const fetchQuery =
  //       userQueries.fetchTransactionHistory +
  //       whereClause +
  //       ` OFFSET $${paramValues.length + 1} LIMIT $${paramValues.length + 2};`;
  //
  //     const countQuery = userQueries.countFetchTransactionHistory + whereClause;
  //
  //     _logger.log(`Fetch query: ${fetchQuery}\n`);
  //     _logger.log(`Count query: ${countQuery}\n`);
  //
  //     _logger.log(`Param values: ${paramValues}\n`);
  //
  //     return await GenericHelper.paginatedData(
  //       fetchQuery,
  //       countQuery,
  //       page,
  //       limit,
  //       paramValues,
  //     );
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when fetching transaction history',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static readonly getBanksPaystack = async () => {
  //   try {
  //     const request = PayStackService.getBanks();
  //     const response = await HttpService.req(request);
  //     if (response?.status !== 200) {
  //       throw new ApiError(response?.status, response?.message);
  //     }
  //     const { data: banks } = response;
  //     return banks;
  //   } catch (err) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when getting banks',
  //       err,
  //     );
  //     throw err;
  //   }
  // };

  // static readonly verifyBankAccountPaystack = async (
  //   accountNum: string,
  //   bankCode: string,
  // ) => {
  //   try {
  //     const request = PayStackService.verifyBankAccount(accountNum, bankCode);
  //
  //     const response = await HttpService.req(request);
  //     if (response?.status !== 200) {
  //       throw new ApiError(response?.status, response?.message);
  //     }
  //
  //     console.log(response.data);
  //
  //     const { account_name: accountName, account_number: accountNumber } =
  //       response.data.data;
  //     _logger.log(
  //       `Account name: ${accountName}, Account number: ${accountNumber}`,
  //     );
  //     return { accountName, accountNumber };
  //   } catch (error) {
  //     _logger.error(
  //       '[UserRepository]::Something went wrong when verifying bank account',
  //       error,
  //     );
  //     throw error;
  //   }
  // };

  // static readonly updateBankAccountDetails = async (
  //   id: string,
  //   accountName: string,
  //   accountNumber: string,
  //   bankCode: string,
  //   bankName: string,
  // ) => {
  //   await sqlQuest.none(userQueries.updateBankAccountDetails, [
  //     GenericHelper.generateId(),
  //     accountName,
  //     accountNumber,
  //     bankCode,
  //     id,
  //     bankName,
  //   ]);
  // };
}
