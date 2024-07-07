import { UserAccount } from '../../../shared/types/user/userAccount';
import { sqlQuest } from '../../../config/database';
import Logger from '../../../config/logger';
import { userQueries } from '../queries';
import { CreateUserValidator } from '../validation';
import { GenericHelper } from '../../../shared/helpers/generic.helper';

const _logger = new Logger('User.Repository');
export class UserRepository {
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

  static createUser = async (
    request: CreateUserValidator,
  ): Promise<UserAccount> => {
    try {
      const { fullName, userName, email, phoneNumber, password } = request;
      const id = GenericHelper.generateId();

      const user = await sqlQuest.one(userQueries.createUserAccount, [
        id,
        fullName,
        userName,
        email,
        phoneNumber,
        password,
      ]);

      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when creating a user',
        err,
      );
      throw err;
    }
  };

  static storeOtp = async (userId: string, otp: string): Promise<void> => {
    try {
      await sqlQuest.none(userQueries.storeOtp, [userId, otp]);
      return;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when storing otp',
        err,
      );
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

  static getUserByPhoneNumber = async (
    phoneNumber: string,
  ): Promise<UserAccount> => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.getUserByPhoneNumber, [
        phoneNumber,
      ]);
      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when getting user by phone number',
        err,
      );
      throw err;
    }
  };

  static getUserByEmail = async (email: string): Promise<UserAccount> => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.getUserByEmail, [
        email,
      ]);
      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when getting user by email',
        err,
      );
      throw err;
    }
  };

  static getUserByUserName = async (userName: string): Promise<UserAccount> => {
    try {
      const user = await sqlQuest.oneOrNone(userQueries.getUserByUserName, [
        userName,
      ]);
      return user;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when getting user by userName',
        err,
      );
      throw err;
    }
  };

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

  static resetPassword = async (id: string, hashedPassword: string) => {
    try {
      await sqlQuest.none(userQueries.resetPassword, [id, hashedPassword]);
      return;
    } catch (err) {
      _logger.error(
        '[UserRepository]::Something went wrong when resetting password',
        err,
      );
      throw err;
    }
  };
}
