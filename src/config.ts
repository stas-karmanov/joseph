import { Level } from './levels';
import { TransportConstructor } from './transports/index';

export interface Config {
    level: Level;
    transports: TransportConstructor[];
}
