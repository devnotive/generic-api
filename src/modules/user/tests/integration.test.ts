import App from '../../../config/express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import Sinon from 'sinon';
import { sqlQuest } from '../../../config/database';
import sinonChai from 'sinon-chai';
import { StatusCodes } from 'http-status-codes';
import {
  bankAccountFixture,
  createUserFixture,
  forgotPasswordFixture,
  loginFixture,
  resetPasswordFixture,
  updateIndividualContactInfoFixture,
  updateOrganizationContactInfoFixture,
  verifyAccountBvnFixture,
  verifyAccountDriversLicenseFixture,
  verifyAccountNinFixture,
  verifyAccountPassportFixture,
  verifyCacBnDocumentFixture,
  verifyCacRcDocumentFixture,
  verifyForgotPasswordOtpFixture,
  verifyIndividualContactInfoFixture,
  verifyOrganizationAddressInfoFixture,
  verifyOrganizationRepInfoFixture,
  verifyOrganizationContactInfoFixture,
  verifyPhoneNumberOtpFixture,
  verifyUserAddressInfoFixture,
} from './fixtures';
import { HttpService } from '../../../shared/services/http';
import { HttpStatusCode } from 'axios';

chai.use(chaiHttp);
chai.use(sinonChai);

const expect = chai.expect;

const prefix = '/api/v1/user';

describe('USER MODULE TESTS', () => {
  afterEach(() => {
    Sinon.restore();
  });

  const userToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5NDg2OTY3NGNmMzQ5Nzg4YzY3MDZmdmFtYzQ5dzM3MTQiLCJmdWxsTmFtZSI6Ik1pY2hlbGxlIEJyYXZvIiwib3RwIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnZkSEFpT2lJeE1qTTBOVFlpTENKcFlYUWlPakUzTVRJMk9UTTJNVE1zSW1WNGNDSTZNalEzTURBM05qQXhNMzAuVlJTd1ZoYlpFVC1JYWxFS1pqUkZlNjhRemRoODFQQUN2eVZiV1ZjOExYdyIsInVzZXJOYW1lIjoibWljaEJyYXZvMSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiI4NTAwMTMxNDY5IiwidXNlclR5cGUiOiJpbmRpdmlkdWFsIiwiY3JlYXRlZEF0IjoiMjAyNC0wNC0wOFQyMjozOTozNS42ODJaIiwiaGFzVmVyaWZpZWRQaG9uZU51bWJlciI6dHJ1ZSwiaGFzVmVyaWZpZWRDb250YWN0IjpmYWxzZSwiaGFzVmVyaWZpZWROaW4iOmZhbHNlLCJoYXNWZXJpZmllZERyaXZlcnNMaWNlbnNlIjpmYWxzZSwiaGFzVmVyaWZpZWRQYXNzcG9ydCI6ZmFsc2UsImlhdCI6MTcxMjczNDIyNCwiZXhwIjoyNDcwMTE2NjI0fQ.8cS5Xrf95ZAh-PBnVwChFDSQCKDXELfJAsSues7qyKo';

  const userDetails = {
    id: '664869674cf349788c6706fbc49e3714',
    fullName: 'Michael Bravo',
    otp: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiIxMjM0NTYiLCJpYXQiOjE3MTI2OTM2MTMsImV4cCI6MjQ3MDA3NjAxM30.VRSwVhbZET-IalEKZjRFe68Qzdh81PACvyVbWVc8LXw',
    userName: 'mickBravo1',
    email: 'test@gmail.com',
    phoneNumber: '8500131468',
    userType: 'individual',
    createdAt: '2024-04-08T22:39:35.682Z',
    hasVerifiedPhoneNumber: true,
    hasVerifiedContact: false,
    hasVerifiedNin: false,
    hasVerifiedDriversLicense: false,
    hasVerifiedPassport: false,
  };

  const userDetails2 = {
    id: '994869674cf349788c6706fvamc49w3714',
    fullName: 'Michelle Bravo',
    otp: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiIxMjM0NTYiLCJpYXQiOjE3MTI2OTM2MTMsImV4cCI6MjQ3MDA3NjAxM30.VRSwVhbZET-IalEKZjRFe68Qzdh81PACvyVbWVc8LXw',
    userName: 'michBravo1',
    email: 'test1@gmail.com',
    phoneNumber: '8500131469',
    userType: 'individual',
    createdAt: '2024-04-08T22:39:35.682Z',
    hasVerifiedPhoneNumber: true,
    hasVerifiedContact: false,
    hasVerifiedNin: false,
    hasVerifiedDriversLicense: false,
    hasVerifiedPassport: false,
  };

  const userDetails3WithPassword = {
    id: 'a93869674cf349788c6706fvamc49w3714',
    fullName: 'Bellisimo Bravo',
    otp: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiIxMjM0NTYiLCJpYXQiOjE3MTI2OTM2MTMsImV4cCI6MjQ3MDA3NjAxM30.VRSwVhbZET-IalEKZjRFe68Qzdh81PACvyVbWVc8LXw',
    userName: 'bellBravo1',
    email: 'test2@gmail.com',
    password: '$2b$10$l/ivDknAT7nHFkez45wXiutSEiOyl22IvVME7zcLPrlb9qYWrfSHa',
    phoneNumber: '8500131463',
    userType: 'individual',
    createdAt: '2024-04-08T22:39:35.682Z',
    hasVerifiedPhoneNumber: true,
    hasVerifiedContact: false,
    hasVerifiedNin: false,
    hasVerifiedDriversLicense: false,
    hasVerifiedPassport: false,
  };

  const userDetails4WithInvalidPassword = {
    ...userDetails3WithPassword,
    password: '$2b$10$l/ivDknAT7nHFkez45wXiutSEiOyl22IvVME7zcLPrlb9qYWrfSKb',
  };

  const successResponse = {
    status: HttpStatusCode.Ok,
    message: 'Contacts verified successfully',
  };

  const failedResponse = {
    status: HttpStatusCode.BadRequest,
    message: 'Failed to verify contact info',
  };

  const suggestedUserNames = [
    { suggestion: 'jackbravo' },
    { suggestion: 'jack.bravo' },
    { suggestion: 'jack_bravo' },
    { suggestion: 'jack-bravo' },
    { suggestion: 'jackb' },
    { suggestion: 'jackbravoo' },
    { suggestion: 'jackvo' },
    { suggestion: 'jack38' },
    { suggestion: 'jack.35' },
    { suggestion: 'jack_99' },
    { suggestion: 'jack-92' },
  ];

  const wallet = {
    id: 'e625c70b1728440aa261dbda5d702bac',
    user_id: 'a72ca08684d844a49f5953014e728850',
    account_type: 'user',
    balance: '0',
    created_at: '2024-05-16T11:10:54.777Z',
  };

  const getUser = async () => userDetails;
  const getUser2 = async () => userDetails2;
  const getUserWithPassword = async () => userDetails3WithPassword;
  const getUserWithInvalidPassword = async () =>
    userDetails4WithInvalidPassword;
  const getNull = async () => null;
  const getSuccess = async (data: any) => {
    return { ...successResponse, data };
  };
  const getFailed = async () => failedResponse;
  const getSuggestedUserNames = async () => suggestedUserNames;
  const getWallet = async () => wallet;

  it('Should fail to create user account - user with email, phone numer or userName exists', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/create`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to create user account - validation error', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));

    const result = await chai.request(App()).post(`${prefix}/create`).send({});
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.FORBIDDEN);
  });

  it('Should fail to create user account - something went wrong', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/create`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to create user account - something went wrong in create user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/create`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to create a user account - something went wrong in wallet creation', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));
    Sinon.stub(sqlQuest, 'one')
      .onFirstCall()
      .returns(getUser())
      .onSecondCall()
      .returns(getNull());

    const result = await chai
      .request(App())
      .post(`${prefix}/create`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.CREATED);
  });

  it('Should create a user account successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));
    Sinon.stub(sqlQuest, 'one')
      .onFirstCall()
      .returns(getUser())
      .onSecondCall()
      .returns(getWallet());

    const result = await chai
      .request(App())
      .post(`${prefix}/create`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.CREATED);
  });

  // Send Phone Number OTP
  it('Should fail to send phone number OTP - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/send/phone-number-otp`)
      .send({
        phoneNumber: createUserFixture.phoneNumber,
      });
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to send phone number otp - something went wrong in store otp', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/send/phone-number-otp`)
      .send(createUserFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should send phone number OTP successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/send/phone-number-otp`)
      .send({
        phoneNumber: createUserFixture.phoneNumber,
      });
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Phone Number OTP
  it('Should fail to verify phone number OTP - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-phone-number-otp`)
      .send(verifyPhoneNumberOtpFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify phone number OTP - something went wrong when fetching user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-phone-number-otp`)
      .send(verifyPhoneNumberOtpFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to verify phone number OTP - invalid otp', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-phone-number-otp`)
      .send({
        phoneNumber: verifyPhoneNumberOtpFixture.phoneNumber,
        otp: 123455,
      });
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify phone number OTP - something went wrong during onboarding status update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.rejects(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-phone-number-otp`)
      .send(verifyPhoneNumberOtpFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should verify users phone number OTP successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-phone-number-otp`)
      .send(verifyPhoneNumberOtpFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Individual Contact Info
  it('Should fail to verify individual contact info - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-individual-contact-info`)
      .send(verifyIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify an individual contact info', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-individual-contact-info`)
      .send(verifyIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify an individual contact info', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-individual-contact-info`)
      .send(verifyIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify individual contact info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getSuccess(null)));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-individual-contact-info`)
      .send(verifyIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Address Info
  it('Should fail to verify a users address info - User not found ', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-address`)
      .send(verifyUserAddressInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify a users address info - something went wrong', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.rejects(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-address`)
      .send(verifyUserAddressInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should verify a users address info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-address`)
      .send(verifyUserAddressInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify a users address info successfully - organization', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-address`)
      .send(verifyOrganizationAddressInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Update Individual Contact Info
  it('Should fail to update individual contact info - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-individual-contact-info`)
      .send(updateIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to update individual contact info - something went wrong during onboarding contact update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getSuccess(null)));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-individual-contact-info`)
      .send(updateIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to update individual contact info - something went wrong during onboarding contact status update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-individual-contact-info`)
      .send(updateIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should update individual contact info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-individual-contact-info`)
      .send(updateIndividualContactInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Organization Contact Info
  it('Should fail to update organization contact info - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-contact-info`)
      .send(verifyOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify an organization contact info - failed bvn verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-contact-info`)
      .send(verifyOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify an organization contact info - failed rc verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.stub(HttpService, 'req')
      .onFirstCall()
      .returns(getSuccess(null))
      .onSecondCall()
      .returns(getFailed());

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-contact-info`)
      .send(verifyOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify organization contact info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getSuccess(null)));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-contact-info`)
      .send(verifyOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify organization representative info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-rep-info`)
      .send(verifyOrganizationRepInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should fail to verify an organization representative info - no user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-organization-rep-info`)
      .send(verifyOrganizationRepInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  // Update Organization Contact Info
  it('Should fail to update organization contact info - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-organization-contact-info`)
      .send(updateOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to update organization contact info - something went wrong during onboarding contact update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-organization-contact-info`)
      .send(updateOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to update organization contact info - something went wrong during onboarding contact status update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-organization-contact-info`)
      .send(updateOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should update organization contact info successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-organization-contact-info`)
      .send(updateOrganizationContactInfoFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Account
  it('Should fail to verify account - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify account - something went wrong when returning user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to verify an account - failed drivers license verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify an account - failed nin verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountNinFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify an account - failed bvn verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountBvnFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should fail to verify an account - failed passport verification', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountPassportFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify user documents successfully - nin document', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({ id: '123', status: 'verified', summary: 'verified' }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountNinFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify user documents successfully - drivers-license', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({ id: '123', status: 'verified', summary: 'verified' }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify user documents successfully - bvn', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({ id: '123', status: 'verified', summary: 'verified' }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountBvnFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify user documents successfully - passport', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({ id: '123', status: 'verified', summary: 'verified' }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-user-documents`)
      .send(verifyAccountPassportFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Update User Documents
  it('Should fail to verify account - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify account - something went wrong when returning user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to update user documents - something went wrong during user documents update', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.rejects(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should update user documents successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .put(`${prefix}/update-user-documents`)
      .send(verifyAccountDriversLicenseFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Login
  it('Should fail to login - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/login`)
      .send(loginFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to login - something went wrong when fetching user', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/login`)
      .send(loginFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should fail to login - invalid password', async () => {
    Sinon.replace(
      sqlQuest,
      'oneOrNone',
      Sinon.fake.returns(getUserWithInvalidPassword()),
    );

    const result = await chai
      .request(App())
      .post(`${prefix}/login`)
      .send(loginFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.UNAUTHORIZED);
  });

  it('Should login successfully', async () => {
    Sinon.replace(
      sqlQuest,
      'oneOrNone',
      Sinon.fake.returns(getUserWithPassword()),
    );

    const result = await chai
      .request(App())
      .post(`${prefix}/login`)
      .send(loginFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Get User By Id
  it('Should fail to get current logged in user - no token in auth header', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai.request(App()).get(`${prefix}/me`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.UNAUTHORIZED);
  });

  it('Should fail to get current logged in user - no token by bearer', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .get(`${prefix}/me`)
      .set('Authorization', `Bearer`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.UNAUTHORIZED);
  });

  it('Should fail to get current logged in user - invalid token', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .get(`${prefix}/me`)
      .set('Authorization', `Bearer invalid_token`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.UNAUTHORIZED);
  });

  it('Should fail to get current logged in user - user not found in auth middleware', async () => {
    Sinon.stub(sqlQuest, 'oneOrNone').onFirstCall().returns(getNull());

    const result = await chai
      .request(App())
      .get(`${prefix}/me`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to get current logged in user - user not found', async () => {
    Sinon.stub(sqlQuest, 'oneOrNone')
      .onFirstCall()
      .returns(getUser2())
      .onSecondCall()
      .returns(getNull());

    const result = await chai
      .request(App())
      .get(`${prefix}/me`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should get current logged in user details successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .get(`${prefix}/me`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Forgot Password
  it('Should fail to send forgot password otp - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/forgot-password`)
      .send(forgotPasswordFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should send forgot password otp successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/forgot-password`)
      .send(forgotPasswordFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Forgot Password OTP
  it('Should fail to verify forgot password otp - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-forgot-password-otp`)
      .send(verifyForgotPasswordOtpFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify forgot password otp - invalid otp', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-forgot-password-otp`)
      .send({
        email: verifyForgotPasswordOtpFixture.email,
        otp: 123455,
      });
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify forgot password otp successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-forgot-password-otp`)
      .send(verifyForgotPasswordOtpFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Reset Password
  it('Should fail to reset password - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/reset-password`)
      .send(resetPasswordFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to reset password - something went wrong when reseting password', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.rejects(getUser2()));

    const result = await chai
      .request(App())
      .post(`${prefix}/reset-password`)
      .send(resetPasswordFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should reset password successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/reset-password`)
      .send(resetPasswordFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Username is available
  it('Should fail to check if username is available - something went wrong', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .get(
        `${prefix}/username-is-available/?userName=${createUserFixture.userName}`,
      );
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should check if username is available successfully - username is available', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .get(
        `${prefix}/username-is-available/?userName=${createUserFixture.userName}`,
      );
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should check if username is available successfully - username is not available', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser2()));

    const result = await chai
      .request(App())
      .get(
        `${prefix}/username-is-available/?userName=${createUserFixture.userName}`,
      );
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should fail to get username-suggestions - something went wrong', async () => {
    Sinon.replace(sqlQuest, 'manyOrNone', Sinon.fake.rejects(getNull()));

    const result = await chai
      .request(App())
      .get(`${prefix}/username-suggestions?fullName=Jack Bravo`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('Should get username-suggestions successfully - individual', async () => {
    Sinon.replace(
      sqlQuest,
      'manyOrNone',
      Sinon.fake.returns(getSuggestedUserNames()),
    );

    const result = await chai
      .request(App())
      .get(`${prefix}/username-suggestions?fullName=Jack Bravo`);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should get username-suggestions successfully - organization', async () => {
    Sinon.replace(
      sqlQuest,
      'manyOrNone',
      Sinon.fake.returns(getSuggestedUserNames()),
    );

    const result = await chai
      .request(App())
      .get(`${prefix}/username-suggestions?fullName=Tesla`);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Get Banks
  it('Should fail to get banks - something went wrong', async () => {
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai.request(App()).get(`${prefix}/get-banks`);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should get banks successfully', async () => {
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getSuccess([])));

    const result = await chai.request(App()).get(`${prefix}/get-banks`);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Bank Account
  it('Should fail to verify bank account - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-bank-account`)
      .send(bankAccountFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });
  it('Should fail to verify bank account - verification failed', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-bank-account`)
      .send(bankAccountFixture);
    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify bank account successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({
          data: {
            id: '123',
            accountName: 'John Doe',
            accountNumber: '1234567890',
            nuban: {
              accountName: 'John Doe',
              accountCurrency: 'NGN',
            },
          },
        }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));
    Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-bank-account`)
      .send(bankAccountFixture);
    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  // Verify Cac Document
  it('Should fail to verify cac document - user not found', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getNull()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-cac-document`)
      .send(verifyCacBnDocumentFixture);

    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.NOT_FOUND);
  });

  it('Should fail to verify cac document - verification failed', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(HttpService, 'req', Sinon.fake.returns(getFailed()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-cac-document`)
      .send(verifyCacBnDocumentFixture);

    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.BAD_REQUEST);
  });

  it('Should verify cac document successfully - bn number', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({
          id: '123',
          summary: 'success',
          status: 'verified',
        }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-cac-document`)
      .send(verifyCacBnDocumentFixture);

    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should verify cac document successfully - rc number', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.replace(
      HttpService,
      'req',
      Sinon.fake.returns(
        getSuccess({
          id: '123',
          summary: 'success',
          status: 'verified',
        }),
      ),
    );
    Sinon.replace(sqlQuest, 'one', Sinon.fake.returns(getUser()));

    const result = await chai
      .request(App())
      .post(`${prefix}/verify-cac-document`)
      .send(verifyCacRcDocumentFixture);

    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should fetch transaction history successfully', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.stub(sqlQuest, 'manyOrNone').resolves([]);
    Sinon.stub(sqlQuest, 'one').resolves({ count: 1 });

    const result = await chai
      .request(App())
      .get(`${prefix}/transaction-history`)
      .set('Authorization', `Bearer ${userToken}`)
      .query({
        type: 'thrift',
        search: 'test',
        date: '2024/06/04',
      });

    expect(result.body).to.have.property('status', 'success');
    expect(result.status).to.eql(StatusCodes.OK);
  });

  it('Should fail to fetch transaction history - something wrong happened', async () => {
    Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.returns(getUser()));
    Sinon.stub(sqlQuest, 'manyOrNone').rejects([]);
    Sinon.stub(sqlQuest, 'one').resolves({ count: 1 });

    const result = await chai
      .request(App())
      .get(`${prefix}/transaction-history`)
      .set('Authorization', `Bearer ${userToken}`)
      .query({
        type: 'thrift',
        search: 'test',
        date: '2024/06/04',
      });

    expect(result.body).to.have.property('status', 'error');
    expect(result.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
