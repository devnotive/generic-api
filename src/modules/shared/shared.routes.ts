import express from 'express';

import { SharedController } from './shared.controller';
import { tryCatch } from '../../shared/helpers';

import { SharedMiddleware } from './middleware/shared.middleware';
import { ValidationMiddleware } from '../../shared/validators/middleware';
import { getSignedUrlValidator, uploadFileValidator } from './validation';

const { validateRequest } = ValidationMiddleware;

const router = express.Router();

router.post(
  '/s3/upload',
  validateRequest(uploadFileValidator),
  tryCatch(SharedMiddleware.checkIfFileIsPassed),
  tryCatch(SharedMiddleware.checkFileSize),
  tryCatch(SharedController.uploadFile),
);

router.post(
  '/s3/bulk/upload',
  validateRequest(uploadFileValidator),
  tryCatch(SharedMiddleware.checkingBulkFiles),
  tryCatch(SharedController.bulkUploadFile),
);

router.get(
  '/s3/signed-url',
  validateRequest(getSignedUrlValidator),
  tryCatch(SharedController.getSignedUrl),
);

router.post(`/paystack/webhook`, tryCatch(SharedController.payStackWebhook));

export const sharedRouter = router;
