import axios from 'axios';
import { apiConstants } from '../../utils/constants';
import Env from '../../../shared/utils/env';
import Logger from '../../../config/logger';

const { __test__, __verifyme__ } = apiConstants;

const _logger = new Logger('User.Repository');

const baseUrl = 'https://api.qoreid.com';
const credentials = {
  clientId: Env.get('VERIFY_ME_CLIENT_ID'),
  secret: Env.get('VERIFY_ME_CLIENT_SECRET'),
};

export class VerifyMeService {
  static async authorize(): Promise<any> {
    _logger.log('Authorizing...');
    const url = `${baseUrl}/token`;
    return __test__
      ? { data: { accessToken: 'token' } }
      : axios.post(url, credentials);
  }

  static async verifyBvn(
    bvn: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    env: string,
  ): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const bvnNumber = __verifyme__ === env ? '95888168924' : bvn;
    const url = `${baseUrl}/v1/ng/identities/bvn-basic/${bvnNumber}`;
    const data =
      __verifyme__ === env
        ? {
            firstname: 'Bunch',
            lastname: 'Dillon',
            phoneNumber: '08000000000',
          }
        : { firstname, lastname, phoneNumber };
    _logger.log(`Headers: ${JSON.stringify(headers)}`);
    _logger.log(`Url: ${url}`);
    _logger.log(`Data: ${JSON.stringify(data)}`);
    return __test__ ? {} : axios.post(url, data, { headers });
  }

  static async verifyPassport(
    document: string,
    firstname: string,
    lastname: string,
    env: string,
  ): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const passport = __verifyme__ === env ? 'A10000001' : document;
    const url = `${baseUrl}/v1/ng/identities/passport/${passport}`;
    const data =
      __verifyme__ === env
        ? {
            firstname: 'John',
            lastname: 'Doe',
          }
        : { firstname, lastname };
    return __test__ ? {} : axios.post(url, data, { headers });
  }

  static async verifyDriversLicense(
    document: string,
    firstName: string,
    lastName: string,
    env: string,
  ): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const licenseNumber = __verifyme__ === env ? '63184876213' : document;
    const url = `${baseUrl}/v1/ng/identities/drivers-license/${licenseNumber}`;
    const data =
      __verifyme__ === env
        ? {
            firstname: 'Bunch',
            lastname: 'Dillon',
          }
        : { firstName, lastName };
    return __test__ ? {} : axios.post(url, data, { headers });
  }

  static async verifyNin(
    document: string,
    firstName: string,
    lastName: string,
    env: string,
  ): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const nin = __verifyme__ === env ? '63184876213' : document;
    const url = `${baseUrl}/v1/ng/identities/nin/${nin}`;
    const data =
      __verifyme__ === env
        ? {
            firstname: 'Bunch',
            lastname: 'Dillon',
          }
        : { firstName, lastName };
    return __test__ ? {} : axios.post(url, data, { headers });
  }


  static async getBanks(): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const url = `${baseUrl}/v1/banks`;
    return __test__ ? {} : axios.get(url, { headers });
  }

  static async verifyBankAccountDetails(
    firstname: string,
    lastname: string,
    accountNumber: string,
    bankCode: string,
    env: string,
  ): Promise<any> {
    const authorize = await this.authorize();
    const headers = { Authorization: `Bearer ${authorize.data.accessToken}` };
    const url = `${baseUrl}/v1/ng/identities/nuban`;
    const data =
      env === 'test'
        ? {
            firstname: 'Esigie',
            lastname: 'Aguele',
            accountNumber: '0122734405',
            bankCode: '062',
          }
        : { firstname, lastname, accountNumber, bankCode };
    return __test__ ? {} : axios.post(url, data, { headers });
  }
}
