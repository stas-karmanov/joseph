import { Level } from '../../levels';
import { TransportFactory } from '../transport.models';

export type ConsoleFactoryConstructor = (customLevel?: Level) => TransportFactory;

export type LevelMap = { [level: string]: (message: string) => void };
