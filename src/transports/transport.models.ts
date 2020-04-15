import { Level } from '../levels';

export interface Transport {
    send(message: string): void;
}

export type TransportConstructor = (defaultLoggerLevel: Level) => Transport;
export type TransportFactory = (customLevel?: Level) => TransportConstructor;
