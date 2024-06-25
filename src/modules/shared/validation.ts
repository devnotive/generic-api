import z from 'zod';

export const uploadFileValidator = z.object({
  // file_type: z.nativeEnum(FileType),
  user_id: z.string(),
});

export const getSignedUrlValidator = z.object({
  key: z.string(),
});

export type UploadFileValidator = typeof uploadFileValidator._type;
// export type GetSignedUrlValidator = typeof getSignedUrlValidator._type;
