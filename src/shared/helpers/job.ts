import cron from 'node-schedule';

/**
 * @class JobHelper
 * @Brief Defines helper methods for jobs
 */
class JobHelper {
  /**
   * Runs a task at a scheduled time
   * @param {String} expression - return value of the resolver
   * @param {Function} func - return value of the resolver
   */
  static jobSchedular(expression: string, func: () => void): void {
    cron.scheduleJob(expression, func);
  }
}

export default JobHelper;
