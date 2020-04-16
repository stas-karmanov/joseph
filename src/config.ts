import { Level } from './levels';
import { TransportConstructor } from './transports';

export interface Config {
    level: Level;
    transports: TransportConstructor[];
}
