// import { extname } from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { S3, BucketName } from '../../../config/aws';
// import { sqlQuest } from '../../../config/database';
//
// import { apiConstants } from '../../../shared/utils/constants';
// import { FileType } from '../../../shared/enums';
// import { GenericHelper } from '../../../shared/helpers/generic.helper';
// import Logger from '../../../config/logger';
// import crypto from 'crypto';
// import Env from '../../../shared/utils/env';
// import { SharedRepository } from '../repository';
// import { WalletRepository } from '../../../modules/wallet/repository';
// import { ApiError } from '../../../shared/utils/api.error';
// import { StatusCodes } from 'http-status-codes';
//
// const { __test__ } = apiConstants;
// const { generateId } = GenericHelper;
//
// interface LoadedFileInfo {
//   name: string;
//   size: number;
//   mimetype: string;
//   lastModified: number;
//   data: Blob;
//   createReadStream(): any;
// }
//
// const _logger = new Logger('SharedService');
// class SharedService {
//   static async upload(
//     file: LoadedFileInfo,
//     name: string,
//     type: FileType,
//     user_id: string,
//   ) {
//     _logger.log('Uploading file to AWS in ');
//     const ext = extname(name);
//     const date = new Date();
//     const key = `${date.valueOf()}${uuidv4()}${ext}`;
//     const params = {
//       Bucket: BucketName,
//       Key: key,
//       Body: file.data,
//       ContentType: file.mimetype,
//       ACL: 'private',
//     };
//     __test__ ? {} : await S3.upload(params).promise();
//     const id = generateId();
//     sqlQuest.none(
//       'INSERT INTO "File" ("id", "fileName", "fileType", "fileExtension", "fileSize", "fileUrl","userId") VALUES ($1, $2, $3, $4, $5, $6, $7)',
//       [id, name, type.toString(), ext, file.size, key, user_id],
//     );
//     return {
//       id: id,
//       type: ext,
//       key: key,
//       fileName: name,
//       fileSize: file.size,
//       fileExtension: ext,
//       fileType: type.toString(),
//     };
//   }
//
//   /**
//    * upload - uploads multiple file to AWS
//    * @param {Buffer} files - List of files of file buffer
//    * @returns {Object} - Has array of the URLs to the bucket on AWS
//    */
//   /* istanbul ignore next */
//   static async uploadMultiple(
//     files: [LoadedFileInfo],
//     file_type: FileType,
//     user_id: string,
//   ) {
//     const uploadPromises = files.map(async (file) => {
//       const { id, type, key, fileName, fileSize, fileType } =
//         await SharedService.upload(file, file.name, file_type, user_id);
//       return { id, type, key, fileName, fileSize, fileType };
//     });
//
//     const imagesObjs = await Promise.all(uploadPromises);
//     return imagesObjs;
//   }
//
//   static async getSignedUrl(key: string) {
//     const params = {
//       Bucket: BucketName,
//       Key: key as string,
//       Expires: 60 * 60 * 25, // Expires after 25 hours
//     };
//
//     const fileUrl = S3.getSignedUrl('getObject', params);
//     console.log('File URL: ', fileUrl);
//
//     return { file: fileUrl };
//   }
//
//   static readonly computePaystackSignatureValidity = (
//     body: string,
//     hash: string,
//   ): boolean => {
//     try {
//       _logger.log(`Computing paystack signature with body - ${body}`);
//
//       const computedHash = crypto
//         .createHmac('sha512', Env.get('PAYSTACK_SECRET_KEY'))
//         .update(body)
//         .digest('hex');
//       return hash == computedHash;
//     } catch (error) {
//       _logger.error(
//         'Error: Error occurred while computing paystack signature in SharedService::computePaystackSignature',
//         error,
//       );
//       throw error;
//     }
//   };
//
//   static readonly processPaystackFundWallet = async (data: any) => {
//     try {
//       _logger.log(
//         `Processing paystack fund wallet in SharedService::processPaystackFundWallet with data - ${JSON.stringify(
//           data,
//         )}`,
//       );
//       const { reference, amount, channel } = data;
//       _logger.log(
//         `Processing paystack fund wallet with reference - ${reference}`,
//       );
//
//       const transaction = await SharedRepository.getTransactionByReference(
//         reference,
//       );
//       if (!transaction) {
//         _logger.log(
//           `Transaction with reference - ${reference} not found in SharedService::processPaystackFundWallet`,
//         );
//         throw new ApiError(StatusCodes.NOT_FOUND, 'Transaction not found');
//       }
//       _logger.log(`Transaction found - ${JSON.stringify(transaction)}`);
//
//       const { id: transactionId, walletId } = transaction;
//       const wallet = await WalletRepository.fetchWalletById(walletId);
//       if (!wallet) {
//         _logger.log(
//           `Wallet with id - ${walletId} not found in SharedService::processPaystackFundWallet`,
//         );
//         throw new ApiError(StatusCodes.NOT_FOUND, 'Wallet not found');
//       }
//
//       // credit user wallet and debit purple vest wallet, create entries in transactionLedger then update individual wallets
//       const fundedWallet = await SharedRepository.fundWallet(
//         walletId,
//         amount,
//         transactionId,
//       );
//       _logger.log(
//         `Wallet funded - ${JSON.stringify(
//           fundedWallet,
//         )} in SharedService::processPaystackFundWallet`,
//       );
//
//       // set transaction to success and completed
//       const completedTransaction = await SharedRepository.completeTransaction(
//         transactionId,
//         channel,
//       );
//       _logger.log(
//         `Transaction completed - ${JSON.stringify(
//           completedTransaction,
//         )} in SharedService::processPaystackFundWallet`,
//       );
//       return;
//     } catch (error) {
//       _logger.error(
//         'Error: Error occurred while processing paystack fund wallet in SharedService::processPaystackFundWallet',
//         error,
//       );
//       throw error;
//     }
//   };
// }
//
// export default SharedService;
