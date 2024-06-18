import {
  SavingsParticipantType,
  SavingsType,
  ThriftSchedule,
} from '../../../shared/enums';
import { BaseEntity } from '../index';

export interface Savings extends BaseEntity {
  planName: string;
  walletId: string;
  amount: number;
  targetAmount: number;
  type: SavingsParticipantType;
  savingsType: SavingsType;
  schedule: ThriftSchedule;
  numberOfUsers: number;
  minUsers: number;
  maxUsers: number;
  cycleType: string;
  currentCycle: number;
  startPeriod: Date;
  endPeriod: Date;
}

export interface SavingsUser extends BaseEntity {
  savingsId: string;
  userId: string;
  amount: number;
  status: string;
  cycle: number;
  hasPaid: boolean;
}
