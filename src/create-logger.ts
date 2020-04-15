import { Config } from './config';
import { Logger } from './logger';

export type CreateLoggerFn = (config: Config) => Logger;
export const createLogger: CreateLoggerFn = config => new Logger(config);
