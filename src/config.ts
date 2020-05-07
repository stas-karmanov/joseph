import { Level } from './levels';
import { TransportFactory } from './transports';

export interface Config {
    level: Level;
    transports: TransportFactory[];
}
