import { AxiosError, AxiosPromise } from 'axios';
import Logger from '../../../config/logger';

const _logger = new Logger('HttpService');
export class HttpService {
  static async req(request: AxiosPromise): Promise<any> {
    try {
      const response = await request;
      return response;
    } catch (err) {
      _logger.error(
        `[HttpService]::Something went wrong with the request`,
        err,
      );
      console.log(err);
      const axiosError = err as AxiosError;
      return {
        status: axiosError.response?.status,
        message: axiosError.message,
        response: axiosError.response?.data,
        code: axiosError.code,
      };
    }
  }
}
