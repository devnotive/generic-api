import { sqlQuest } from '../../../config/database';
import { sharedQueries } from '../queries';

export class SharedRepository {
  static async getTransactionByReference(reference: string): Promise<any> {
    return await sqlQuest.oneOrNone(sharedQueries.fetchTransactionByReference, [
      reference,
    ]);
  }

  static async completeTransaction(id: string, method: string) {
    return await sqlQuest.one(sharedQueries.completeTransaction, [id, method]);
  }

  static async fundWallet(
    walletId: string,
    amount: number,
    transactionId: string,
  ) {
    return await sqlQuest.one(sharedQueries.fundWalletAndRecordInLedger, [
      walletId,
      amount,
      transactionId,
    ]);
  }
}
