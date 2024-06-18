import { UserTokenType } from 'src/shared/types/user/userAccount';
// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: UserTokenType;
    passedFiles?: {
      filesOver2MB: File[];
      filesUnder2MB: File[];
    };
  }
}
