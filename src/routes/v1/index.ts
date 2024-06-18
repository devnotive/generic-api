import express from 'express';
// import { sharedRouter } from '../../modules/shared/shared.routes';
// import { userRouter } from '../../modules/user/user.routes';
// import { walletRouter } from '../../modules/wallet/wallet.routes';
// import { savingsRouter } from '../../modules/savings/savings.routes';

const appRouter = express.Router();
// appRouter.use('/shared', sharedRouter);
// appRouter.use('/user', userRouter);
// appRouter.use('/admin', adminRouter);
// appRouter.use('/role', roleRouter);
// appRouter.use('/wallet', walletRouter);
// appRouter.use('/savings', savingsRouter);

export const Router = appRouter;
