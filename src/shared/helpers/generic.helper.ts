import crypto from 'crypto';
import { sqlQuest } from '../../config/database';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Logger from '../../config/logger';

const _logger = new Logger('GenericHelper');

interface PaginationProps {
  page: number;
  limit: number;
  getCount: string;
  getResources: string;
  params: string[];
  countParams: string[];
}
export class GenericHelper {
  static generateId(): string {
    return crypto.randomUUID().replace(/-/g, '');
  }

  static fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = [],
  }: PaginationProps) {
    const offSet = (+page - 1) * +limit;
    const fetchCount = sqlQuest.oneOrNone(getCount, [...countParams]);
    const fetchCountResource = sqlQuest.any(getResources, [
      offSet,
      +limit,
      ...params,
    ]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  static async paginatedData(
    resourceQuery: string,
    countQuery: string,
    page: number,
    limit: number,
    queryParams: any,
  ): Promise<{
    data: any[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;

    // where queryParams is an array or an object
    if (Array.isArray(queryParams)) {
      queryParams.push(offset, limit);
    } else {
      queryParams.offset = offset;
      queryParams.limit = limit;

      resourceQuery += ` OFFSET $/offset/ LIMIT $/limit/;`;
    }

    const fetchCount = sqlQuest.oneOrNone(countQuery, queryParams);
    const fetchData = sqlQuest.manyOrNone(resourceQuery, queryParams);

    const [{ count }, data] = await Promise.all([fetchCount, fetchData]);
    const totalCount: number = count;
    const totalPages: number = GenericHelper.calcPages(totalCount, limit);

    return {
      data,
      currentPage: page,
      totalCount,
      totalPages,
    };
  }

  static generateOTP(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
  }

  static calcPages(total: number, limit: number) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }
  static hashText = async (
    text: string,
    saltRound: number,
  ): Promise<{ salt: string; hashedText: string }> => {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedText = await bcrypt.hash(text, salt);
    return { salt, hashedText };
  };

  static compareHash = async (text: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(text, hash);
  };

  static generateRandomNumber = (length: number): number => {
    if (length <= 0) {
      throw new Error('Length must be greater than 0');
    }

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  static hashOtp = (otp: number, secret: string, expTime: string): string => {
    return jwt.sign({ otp }, secret, {
      expiresIn: expTime,
    });
  };

  static verifyOtp = (
    otp: number,
    hashedOtp: string,
    secret: string,
  ): boolean => {
    try {
      _logger.log(`[GenericHelper]::Hashed otp - ${hashedOtp}`);
      const decodedToken = jwt.verify(hashedOtp, secret) as {
        otp: string;
        exp: number;
      };

      _logger.log(
        `[GenericHelper]::Decoded token - ${JSON.stringify(decodedToken)}`,
      );
      _logger.log(`[GenericHelper]::Otp - ${otp}`);

      if (
        !decodedToken ||
        !decodedToken.otp ||
        !decodedToken.exp ||
        parseInt(decodedToken.otp) !== otp
      ) {
        return false;
      }
      return true;
    } catch (err) {
      _logger.error(
        '[GenericHelper]::Something went wrong when verifying otp',
        err,
      );
      return false;
    }
  };

  static readonly monthsDiff = (date1: string, date2: string) => {
    const start = new Date(date1);
    const end = new Date(date2);

    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    const totalMonths = yearsDiff * 12 + monthsDiff;

    return totalMonths;
  };
}
