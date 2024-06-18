// import { SavingsService } from '../../modules/savings/service';
// import Logger from '../../config/logger';
// import JobHelper from '../helpers/job';
// import { scheduleTimes } from '../utils/constants';
//
// const _logger = new Logger('Scheduler');
//
// export class Scheduler {
//   static readonly run = async () => {
//     try {
//       _logger.log('Running scheduler');
//       await Scheduler.scheduleUpdateThriftCycle();
//     } catch (error) {
//       _logger.error(
//         '[Scheduler]::run - Something went wrong when running scheduler',
//         error,
//       );
//     }
//   };
//
//   static readonly scheduleUpdateThriftCycle = async () => {
//     try {
//       _logger.log('Scheduling thrift cycle update');
//       JobHelper.jobSchedular(scheduleTimes.EVERY_THIRTY_MINUTES, async () => {
//         _logger.log('Updating thrift cycle');
//         const runningThriftSavings =
//           await SavingsService.fetchRunningThriftSavingsWithEndedCycle();
//         if (runningThriftSavings.length > 0) {
//           _logger.log(
//             `[Scheduler::scheduleUpdateThriftCycle] :: runningThriftSavings count: ${runningThriftSavings.length}`,
//           );
//           await SavingsService.processThriftSavingsCycle(runningThriftSavings);
//         }
//       });
//     } catch (error) {
//       _logger.error(
//         '[Scheduler]::scheduleUpdateThriftCycle - Something went wrong when scheduling thrift cycle update',
//         error,
//       );
//     }
//   };
// }
