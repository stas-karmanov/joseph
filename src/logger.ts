import { Config } from './config';
import { LEVELS_SEVERITY, Level } from './levels';

export class Logger {
    private level: Level;
    private transports: any[];

    constructor(config: Config) {
        this.level = config.level;
        this.transports = config.transports;
    }

    public log(level: Level, message: string) {
        if (LEVELS_SEVERITY[level] > LEVELS_SEVERITY[this.level]) {
            return;
        }

        this.transports.forEach(transport => transport.send({ level, message }));
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
