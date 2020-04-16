import { Level } from '../../levels';
import { TransportConstructor } from '../transport.models';

export const DEFAULT_THROTTLE_TIME = 2000;
export const DEFAULT_MAX_RECORDS_COUNT = 100;

export interface HttpFactoryArgs {
    url: string;
    method?: string;
    headers?: { [key: string]: string };
    throttleTime?: number;
    maxRecordsCount?: number;
}

export interface HttpTransportAgs extends HttpFactoryArgs {
    level: Level;
}

export type HttpFactory = (args: HttpFactoryArgs & { level?: Level }) => TransportConstructor;
