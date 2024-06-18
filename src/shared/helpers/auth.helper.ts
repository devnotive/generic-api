import Logger from '../../config/logger';
import * as jwt from 'jsonwebtoken';
import Env from '../utils/env';
import { sqlQuest } from '../../config/database';
import { userQueries } from '../../modules/user/queries';
import { UserTokenType } from '../types/user/userAccount';

const _logger = new Logger('TokenClass');
export class TokenClass {
  static verifyUserToken = async (token: string) => {
    const userInfo = jwt.verify(token, Env.get('SECRET')) as UserTokenType;
    _logger.log(
      `Finished verifying jwt with data - ${JSON.stringify(userInfo)}`,
    );
    return await sqlQuest.oneOrNone(userQueries.getUserById, [userInfo.id]);
  };
}
