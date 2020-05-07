import { ajax } from 'rxjs/ajax';
import { bufferTime, filter, mergeMap, catchError } from 'rxjs/operators';
import { Subject, EMPTY } from 'rxjs';

import { Transport } from '../transport.models';
import { Level } from '../../levels';
import {
    HttpFactoryConstructor,
    HttpTransportArgs,
    DEFAULT_THROTTLE_TIME,
    DEFAULT_MAX_RECORDS_COUNT,
} from './http.models';

class HttpTransport implements Transport {
    private send$ = new Subject<string>();

    constructor(private config: HttpTransportArgs) {
        const {
            url,
            method = 'POST',
            headers = null,
            throttleTime = DEFAULT_THROTTLE_TIME,
            maxRecordsCount = DEFAULT_MAX_RECORDS_COUNT,
        } = this.config;

        this.send$
            .pipe(
                bufferTime(throttleTime, null, maxRecordsCount),
                filter(logRecords => Boolean(logRecords.length)),
                mergeMap(logRecords =>
                    ajax({
                        url,
                        method,
                        headers: { 'Content-Type': 'application/json', ...headers },
                        body: logRecords,
                        crossDomain: true,
                    }).pipe(catchError(() => EMPTY)),
                ),
            )
            .subscribe();
    }

    public getLevel(): Level {
        return this.config.level;
    }

    public send(level: Level, message: string) {
        this.send$.next(JSON.stringify({ level, message, timestamp: new Date().toUTCString() }));
    }
}

export const createHttp: HttpFactoryConstructor = args => (defaultLoggerLevel: Level) => {
    if (!args.level && !defaultLoggerLevel) {
        throw new Error('logging level must be provided!');
    }

    return new HttpTransport({ ...args, level: args.level || defaultLoggerLevel });
};
