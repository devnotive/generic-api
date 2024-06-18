import { BaseEntity } from '../index';
import { UserType } from '../../enums';

export interface UserAccount extends BaseEntity {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: UserType;
  otp?: string;
  contactAddress?: string;
  bankName?: string;
  bvnNumber?: string;
  accountNumber?: string;
  ninId?: string;
  driversLicenseId?: string;
  officeAddress?: string;
  rcNumber?: string;
  bnNumber?: string;
  hasVerifiedPhoneNumber: boolean;
  hasVerifiedContact: boolean;
  hasVerifiedNin: boolean;
  hasVerifiedDriversLicense: boolean;
  hasVerifiedPassport: boolean;
  hasVerifiedBankAccount: boolean;
  hasVerifiedBvn: boolean;
  hasVerifiedAddress: boolean;
  hasVerifiedCac: boolean;
}

export interface UserAccountDTO {
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  userType: UserType;
  contactAddress?: string;
  officeAddress?: string;
  hasVerifiedPhoneNumber: boolean;
  hasVerifiedContact: boolean;
  hasVerifiedNin: boolean;
  hasVerifiedDriversLicense: boolean;
  hasVerifiedPassport: boolean;
}

export interface UserTokenType extends Omit<UserAccount, 'password'> {
  id: string;
}
