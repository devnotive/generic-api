// import { StatusCodes } from 'http-status-codes';
// import Logger from '../../config/logger';
// import { ResponseHandler } from '../../shared/helpers';
// import { NextFunction, Request, Response } from 'express';
// import SharedService from './service/shared.service';
// import { UploadFileValidator } from './validation';
// import { ApiError } from '../../shared/utils/api.error';

// const { upload, uploadMultiple, getSignedUrl, processPaystackFundWallet } =
// SharedService;

// const _logger = new Logger('SharedController');

// export class SharedController {
//   static uploadFile = async (req: Request, res: Response) => {
//     _logger.log('Uploading file to AWS in SharedController::uploadFile');
//     const { file }: any = req.files;
//     const response = new ResponseHandler(req, res);
//     _logger.log(
//       `---------------SharedController:::fetchAdmins-----------------`,
//     );
//
//     const { file_type, user_id } = req.query as unknown as UploadFileValidator;
//
//     const { id, type, key, fileName, fileSize, fileType } = await upload(
//       file,
//       file.name,
//       file_type,
//       user_id,
//     );
//
//     _logger.log('File uploaded sucessfully');
//     return response.success({
//       message: 'File uploaded Successfully',
//       code: StatusCodes.OK,
//       data: {
//         id,
//         type,
//         key,
//         fileName,
//         fileSize,
//         fileType,
//       },
//     });
//   };
//
//   static bulkUploadFile = async (req: Request, res: Response) => {
//     const response = new ResponseHandler(req, res);
//     _logger.log(
//       `---------------SharedController:::fetchAdmins-----------------`,
//     );
//
//     const { file_type, user_id } = req.query as unknown as UploadFileValidator;
//     const { filesUnder2MB, filesOver2MB }: any = req.passedFiles;
//     const imageObjs = await uploadMultiple(filesUnder2MB, file_type, user_id);
//     const formatedLargeFiles = filesOver2MB.map((file: File) => file.name);
//
//     _logger.log('File uploaded sucessfully');
//     return response.success({
//       message: 'File uploaded Successfully',
//       code: StatusCodes.OK,
//       data: { imageObjs, largeFiles: formatedLargeFiles },
//     });
//   };
//
//   static getSignedUrl = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       _logger.log(
//         `--------- Shared Controller ---------: Getting file signed Url`,
//       );
//
//       if (!req.query.key) {
//         return ApiError.appError(
//           {
//             code: StatusCodes.BAD_REQUEST,
//             message: 'key cannot be empty',
//           },
//           req,
//           res,
//           next,
//         );
//       }
//
//       const file = await getSignedUrl(req.query.key as string);
//
//       const response = new ResponseHandler(req, res);
//
//       return response.success({
//         message: 'Signed URL fetched',
//         code: StatusCodes.OK,
//         data: file,
//       });
//     } catch (error) {
//       _logger.error(
//         'Error: An error occurred while fetching signed URL in OtherController::getSignedUrl',
//         error,
//       );
//       throw error;
//     }
//   };
//
//   static async payStackWebhook(req: Request, res: Response) {
//     try {
//       _logger.log(
//         `[SharedController]: Processing paystack event - ${JSON.stringify(
//           req.body,
//         )}`,
//       );
//
//       _logger.log(`[SharedController]: Validating paystack event`);
//       const hash = req.headers['x-paystack-signature'];
//       const isValid = SharedService.computePaystackSignatureValidity(
//         JSON.stringify(req.body),
//         hash as string,
//       );
//
//       _logger.log(`Validity of paystack event - ${isValid}`);
//       if (isValid) {
//         const event = req.body;
//         _logger.log(`Processing paystack event - ${JSON.stringify(event)}`);
//         if (event.event === 'charge.success') {
//           const { data } = event;
//           await processPaystackFundWallet(data);
//         }
//       }
//
//       const response = new ResponseHandler(req, res);
//       return response.success({
//         message: 'Event processed successfully',
//         code: StatusCodes.OK,
//         data: null,
//       });
//     } catch (error) {
//       _logger.error(
//         '[SharedController]::Something when processing paystack event',
//         error,
//       );
//       throw error;
//     }
//   }
// }
