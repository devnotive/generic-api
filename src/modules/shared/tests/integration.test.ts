// import App from '../../../config/express';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import 'mocha';
// import Sinon from 'sinon';
// import { StatusCodes } from 'http-status-codes';
// import { S3 } from '../../../config/aws';
// import { sqlQuest } from '../../../config/database';
// import fs from 'fs';
// import SharedService from '../service/shared.service';
// import { payStackChargeEvent } from './fixtures';
// import Env from '../../../shared/utils/env';
// import crypto from 'crypto';
// import { ApiError } from '../../../shared/utils/api.error';
//
// chai.use(chaiHttp);
//
// const expect = chai.expect;
//
// const prefix = '/api/v1/shared';
//
// const largeFile = fs.readFileSync('src/modules/shared/tests/test_large.txt');
//
// const files = [
//   {
//     fieldname: 'files',
//     originalname: 'test.txt',
//     encoding: '7bit',
//     mimetype: 'text/plain',
//     buffer: Buffer.from('file content 1'),
//   },
//   {
//     fieldname: 'files',
//     originalname: 'test2.txt',
//     encoding: '7bit',
//     mimetype: 'text/plain',
//     buffer: Buffer.from('file content 2'),
//   },
//   {
//     fieldname: 'files',
//     originalname: 'test_large.txt',
//     encoding: '7bit',
//     mimetype: 'text/plain',
//     buffer: Buffer.from(largeFile),
//   },
// ];
//
// const transactionDetailsForFund = {
//   id: 1,
//   reference: 'REF1234',
//   walletId: '12234235',
//   transactionStatus: 'pending',
//   amount: 1000,
//   transactionCategory: 'fund',
// };
//
// const completedTransaction = {
//   id: 'transactionId',
//   reference: 'REF1234',
//   walletId: '12234235',
//   transactionStatus: 'completed',
//   amount: 1000,
//   transactionCategory: 'fund',
// };
//
// const wallet = {
//   id: 'e625c70b1728440aa261dbda5d702bac',
//   user_id: 'a72ca08684d844a49f5953014e728850',
//   account_type: 'user',
//   balance: '0',
//   created_at: '2024-05-16T11:10:54.777Z',
// };
//
// describe('SHARED MODULE TESTS', () => {
//   afterEach(() => {
//     Sinon.restore();
//   });
//
//   const getNull = async () => null;
//   const getTransactionDetailsForFund = async () => transactionDetailsForFund;
//   const getCompletedTransaction = async () => completedTransaction;
//   const getWallet = async () => wallet;
//
//   it('should return 200 if no file is passed', async () => {
//     Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));
//     const res = await chai
//       .request(App())
//       .post(
//         `${prefix}/s3/upload?file_type=profileImage&user_id=dsfjoi423958823`,
//       )
//       .attach('file', 'src/modules/shared/tests/test.txt', 'test.txt');
//     expect(res.status).to.eql(StatusCodes.OK);
//   });
//
//   it('should fail to upload a file - something went wrong', async () => {
//     Sinon.replace(S3, 'upload', Sinon.fake.resolves({}));
//     const res = await chai
//       .request(App())
//       .post(
//         `${prefix}/s3/upload?file_type=profileImage&user_id=dsfjoi423958823`,
//       );
//     expect(res.status).to.eql(StatusCodes.INTERNAL_SERVER_ERROR);
//   });
//
//   it('should fail to upload file - file too large', async () => {
//     Sinon.replace(S3, 'upload', Sinon.fake.resolves({}));
//     const res = await chai
//       .request(App())
//       .post(
//         `${prefix}/s3/upload?file_type=profileImage&user_id=dsfjoi423958823`,
//       )
//       .attach(
//         'file',
//         'src/modules/shared/tests/test_large.txt',
//         'test_large.txt',
//       );
//     expect(res.status).to.eql(StatusCodes.BAD_REQUEST);
//   });
//
//   it('Should bulk upload files to s3', async () => {
//     Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects([]));
//     Sinon.replace(sqlQuest, 'none', Sinon.fake.returns(getNull()));
//     const result = await chai
//       .request(App())
//       .post(
//         `${prefix}/s3/bulk/upload?file_type=profileImage&user_id=dsfjoi423958823`,
//       )
//       .attach(files[0].fieldname, files[0].buffer, files[0].originalname)
//       .attach(files[1].fieldname, files[1].buffer, files[1].originalname);
//     expect(result.status).to.eql(200);
//   });
//
//   it('Should fail to bulk upload files to s3 - no file passed', async () => {
//     Sinon.replace(sqlQuest, 'oneOrNone', Sinon.fake.rejects([]));
//     const result = await chai
//       .request(App())
//       .post(
//         `${prefix}/s3/bulk/upload?file_type=profileImage&user_id=dsfjoi423958823`,
//       );
//     expect(result.status).to.eql(500);
//   });
//
//   it('Should fail to fetch signed url - invalid params', async () => {
//     Sinon.replace(S3, 'getSignedUrl', Sinon.fake.resolves(''));
//     const result = await chai.request(App()).get(`${prefix}/s3/signed-url`);
//     expect(result.status).to.eql(403);
//   });
//
//   it('Should fail to fetch signed url - empty key param', async () => {
//     Sinon.replace(S3, 'getSignedUrl', Sinon.fake.resolves(''));
//     const result = await chai
//       .request(App())
//       .get(`${prefix}/s3/signed-url?key=`);
//     expect(result.status).to.eql(400);
//   });
//
//   // Paystack webhook
//   it('Should process paystack transfer event successfully', async () => {
//     Sinon.replace(
//       SharedService,
//       'computePaystackSignatureValidity',
//       Sinon.fake.returns(true),
//     );
//     Sinon.stub(sqlQuest, 'oneOrNone')
//       .onFirstCall()
//       .resolves(getTransactionDetailsForFund())
//       .onSecondCall()
//       .resolves(getWallet());
//
//     Sinon.stub(sqlQuest, 'one')
//       .onFirstCall()
//       .resolves(getWallet())
//       .onSecondCall()
//       .resolves(getTransactionDetailsForFund());
//     Sinon.stub(sqlQuest, 'none')
//       .onFirstCall()
//       .resolves()
//       .onSecondCall()
//       .resolves(getCompletedTransaction());
//
//     const result = await chai
//       .request(App())
//       .post(`${prefix}/paystack/webhook`)
//       .send(payStackChargeEvent);
//     expect(result.body).to.have.property('status', 'success');
//     expect(result.status).to.eql(200);
//   });
//
//   it('Should fail to process paystack transfer event - transaction with reference not found', async () => {
//     Sinon.replace(
//       SharedService,
//       'computePaystackSignatureValidity',
//       Sinon.fake.returns(true),
//     );
//     Sinon.stub(sqlQuest, 'oneOrNone')
//       .onFirstCall()
//       .resolves(getNull())
//       .onSecondCall()
//       .resolves(getWallet());
//
//     const result = await chai
//       .request(App())
//       .post(`${prefix}/paystack/webhook`)
//       .send(payStackChargeEvent);
//     expect(result.body).to.have.property('status', 'error');
//     expect(result.status).to.eql(StatusCodes.NOT_FOUND);
//   });
//
//   it('Should fail to process paystack transfer event - user wallet not found', async () => {
//     Sinon.replace(
//       SharedService,
//       'computePaystackSignatureValidity',
//       Sinon.fake.returns(true),
//     );
//     Sinon.stub(sqlQuest, 'oneOrNone')
//       .onFirstCall()
//       .resolves(getTransactionDetailsForFund())
//       .onSecondCall()
//       .resolves(getNull());
//
//     const result = await chai
//       .request(App())
//       .post(`${prefix}/paystack/webhook`)
//       .send(payStackChargeEvent);
//     expect(result.body).to.have.property('status', 'error');
//     expect(result.status).to.eql(StatusCodes.NOT_FOUND);
//   });
//
//   // UNIT
//   it('should return false if the computed hash matches the provided hash', () => {
//     // Arrange
//     const body = 'sample body';
//     const hash = 'sample hash';
//     const secret = 'sample secret';
//
//     Sinon.stub(crypto.createHmac('sha512', secret), 'digest').returns(secret);
//
//     Sinon.stub(Env, 'get').returns(secret);
//
//     const result = SharedService.computePaystackSignatureValidity(body, hash);
//
//     // Assert
//     expect(result).to.be.false;
//   });
//
//   it('should throw on exception', () => {
//     // Arrange
//     const body = 'sample body';
//     const hash = 'sample hash';
//     const secret = 'sample secret';
//
//     Sinon.stub(crypto.createHmac('sha512', secret), 'digest').throws();
//
//     Sinon.stub(Env, 'get').throwsException(
//       new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error'),
//     );
//
//     // Assert
//     expect(() => {
//       SharedService.computePaystackSignatureValidity(body, hash);
//     }).to.throw();
//   });
// });
