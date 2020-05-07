import { Config } from './config';
import { LEVELS_SEVERITY, Level } from './levels';
import { Transport } from './transports';

class Logger {
    private level: Level;
    private transports: Transport[];

    constructor(config: Config) {
        this.level = config.level;
        this.transports = config.transports.map(transportFactory => transportFactory(this.level));
    }

    public log(level: Level, message: string) {
        this.transports.forEach(transport => {
            if (LEVELS_SEVERITY[level] > LEVELS_SEVERITY[transport.getLevel()]) {
                return;
            }

            transport.send(level, message);
        });
    }

    public error(message: string) {
        this.log(Level.ERROR, message);
    }

    public warn(message: string) {
        this.log(Level.WARN, message);
    }

    public info(message: string) {
        this.log(Level.INFO, message);
    }

    public http(message: string) {
        this.log(Level.HTTP, message);
    }

    public verbose(message: string) {
        this.log(Level.VERBOSE, message);
    }

    public debug(message: string) {
        this.log(Level.DEBUG, message);
    }

    public silly(message: string) {
        this.log(Level.SILLY, message);
    }
}

export type CreateLoggerFn = (config: Config) => Logger;
export const createLogger: CreateLoggerFn = config => new Logger(config);
