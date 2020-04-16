import { ajax } from 'rxjs/ajax';
import { bufferTime, filter, mergeMap, timeout } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Transport } from '../transport.models';
import { Level } from '../../levels';
import { HttpFactory, HttpTransportAgs, DEFAULT_THROTTLE_TIME, DEFAULT_TIMEOUT } from './http.models';

class HttpTransport implements Transport {
    private send$ = new Subject<string>();

    constructor(private config: HttpTransportAgs) {
        const {
            url,
            method = 'POST',
            headers = {},
            throttleTime = DEFAULT_THROTTLE_TIME,
            timeout: timeoutTime = DEFAULT_TIMEOUT,
        } = this.config;

        this.send$
            .pipe(
                bufferTime(throttleTime),
                filter(logs => Boolean(logs.length)),
                mergeMap(logs => ajax({ url, method, headers, body: logs }).pipe(timeout(timeoutTime))),
            )
            .subscribe();
    }

    public getLevel(): Level {
        return this.config.level;
    }

    public send(level: Level, message: string) {
        this.send$.next(`[${level}] ${message}`);
    }
}

export const httpFactory: HttpFactory = args => (defaultLoggerLevel: Level) => {
    return new HttpTransport({ ...args, level: args.level || defaultLoggerLevel });
};
