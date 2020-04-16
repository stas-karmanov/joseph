import { Level } from '../levels';

export interface Transport {
    getLevel(): Level;
    send(level: Level, message: string): void;
}

export type TransportConstructor = (defaultLoggerLevel: Level) => Transport;
export type TransportFactory = (customLevel?: Level) => TransportConstructor;
