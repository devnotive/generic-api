import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import Logger from '../../config/logger';
import { ZodError } from 'zod';

const logger = new Logger('ApiError');
export class ApiError extends Error {
  private code: number;
  private details: number;
  constructor(code: number, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }

  appError(err: any, req: Request, res: Response, next: NextFunction) {
    const status = 'error';

    if (err instanceof ZodError) {
      const { message } = err;

      this.code = StatusCodes.FORBIDDEN;
      logger.error(`
            Joi validation error: 
            status - ${status}
            message - ${message}
            url - ${req.originalUrl}
            method - ${req.method}
            IP - ${req.ip}
            Error Stacj - ${err.stack}
            `);

      /* const errorMessage: string[] = JSON.parse(message).map(
                (error: {message: string; path: string}) =>`${error.path}: ${error.message} \n`
            ) */

      return res.status(this.code).json({
        message: message,
        status,
        type: getReasonPhrase(this.code),
      });
    }

    if (
      err instanceof ApiError ||
      (this.code && typeof this.code === 'number')
    ) {
      logger.error(`
            API error:
            status - error
            message - ${err.message}
            url - ${req.originalUrl}
            method - ${req.method}
            IP - ${req.ip}
            Error Stack - ${err.stack}
          `);
      console.log('API error');

      return res.status(this.code || 500).json({
        message: err.message,
        status,
        type: getReasonPhrase(this.code || 500),
        error: this.details,
      });
    } else {
      next(err);
      return;
    }
  }

  static appError(err: any, req: Request, res: Response, next: NextFunction) {
    let { code } = err;
    const { details } = err;

    const status = 'error';

    if (err instanceof ZodError) {
      const { message } = err;

      code = StatusCodes.FORBIDDEN;
      logger.error(`
            Zod validation error: 
            status - ${status}
            message - ${message}
            url - ${req.originalUrl}
            method - ${req.method}
            IP - ${req.ip}
            Error Stacj - ${err.stack}
            `);

      const errorMessage: string[] = JSON.parse(message).map(
        (error: { message: string; path: string }) =>
          `${error.path}: ${error.message} \n`,
      );

      return res.status(code).json({
        message: errorMessage.join(' '),
        status,
        type: getReasonPhrase(code),
      });
    }

    if (err instanceof ApiError || (code && typeof code === 'number')) {
      logger.error(`
            API error:
            status - error
            message - ${err.message}
            url - ${req.originalUrl}
            method - ${req.method}
            IP - ${req.ip}
            Error Stack - ${err.stack}
          `);
      console.log('API error');

      return res.status(code || 500).json({
        message: err.message,
        status,
        type: getReasonPhrase(code || 500),
        error: details,
      });
    } else {
      next(err);
      return;
    }
  }

  /**
   * Generic error response handler of internal and unhandled exceptions.
   *
   * @param  {Object}   err
   * @param  {Object}   req
   * @param  {Object}   res
   * @param  {Function} next
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static genericError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const message = 'An error occurred, we are looking into it.';
    const status = 'error';
    const url = req.originalUrl;

    logger.error(`
            Generic error:
            status - ${status}
            message - ${err.message} 
            url - ${url} 
            method - ${req.method} 
            IP - ${req.ip}
          `);

    return res.status(err.status || 500).json({
      message,
      status,
      type: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
    next();
  }
}
