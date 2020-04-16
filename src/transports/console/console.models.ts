import { Level } from '../../levels';
import { TransportConstructor } from '../transport.models';

export type ConsoleFactory = (customLevel?: Level) => TransportConstructor;
