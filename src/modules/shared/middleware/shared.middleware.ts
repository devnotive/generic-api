import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../shared/utils/api.error';
import { StatusCodes } from 'http-status-codes';
import Logger from '../../../config/logger';
import { constants } from '../constants';

import { ResponseMessages } from '../responseMessages';

const { FILE_NOT_PASSED, FILE_TOO_LARGE, FILES_NOT_PASSED, FILES_TOO_LARGE } =
  ResponseMessages;

const { MB } = constants;
const _logger = new Logger('SharedMiddleware');

export class SharedMiddleware {
  static async checkIfFileIsPassed(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { file }: any = req.files;
      if (!file) {
        return next(new ApiError(StatusCodes.BAD_REQUEST, FILE_NOT_PASSED));
      }
      return next();
    } catch (error) {
      _logger.error(
        'Error: An error occurred while checking if file is passed in OtherMiddleware::checkIfFileExists',
        error,
      );
      throw error;
    }
  }

  static async checkFileSize(req: Request, _res: Response, next: NextFunction) {
    try {
      const { file }: any = req.files;
      if (file.size > 2 * MB) {
        return next(new ApiError(StatusCodes.BAD_REQUEST, FILE_TOO_LARGE));
      }
      return next();
    } catch (error) {
      _logger.error(
        'Error: An error occurred while checking file size OtherMiddleware::checkFileSize',
        error,
      );
      throw error;
    }
  }

  static async checkingBulkFiles(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    try {
      const { files }: any = req.files;
      if (!files) {
        return next(new ApiError(StatusCodes.BAD_REQUEST, FILES_NOT_PASSED));
      }

      const filesUnder2MB: File[] = [];
      const filesOver2MB: File[] = [];

      files.forEach((file: File) => {
        if (file.size > 2 * MB) {
          filesOver2MB.push(file);
        } else {
          filesUnder2MB.push(file);
        }
      });

      if (filesUnder2MB.length === 0) {
        return next(new ApiError(StatusCodes.BAD_REQUEST, FILES_TOO_LARGE));
      }

      const passedFiles = {
        filesOver2MB: filesOver2MB,
        filesUnder2MB: filesUnder2MB,
      };

      Object.assign(req, { passedFiles });
      return next();
    } catch (error) {
      _logger.error(
        'Error: An error occurred while checking files in OtherMiddleware::checkingBulkFiles',
        error,
      );
      throw error;
    }
  }
}
