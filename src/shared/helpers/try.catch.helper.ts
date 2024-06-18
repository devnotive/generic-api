import { Request, Response, NextFunction } from 'express';

export const tryCatch =
  (
    controller: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<any>,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch((error) => {
      console.error(error.message);
      next(error);
    });
  };
