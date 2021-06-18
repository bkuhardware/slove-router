import {QueryMap} from "../models/location";

export function parseQuery(queryString: string): QueryMap {
    function addPair(key: string, value: string) {
        if (!key) return;
        if (!map[key]) {
            map[key] = value;
            return;
        }
        if (typeof map[key] === 'string')
            map[key] = [map[key] as string];
        (map[key] as string[]).push(value);
    }

    const map: QueryMap = {};
    const pairs: string[] = queryString.split('&');
    pairs.forEach((pair: string) => {
        let equalSignIdx: number = pair.indexOf('=');
        if (equalSignIdx === 0)
            equalSignIdx = pair.indexOf('=', 1);
        let key: string = '';
        let value: string = '';
        if (equalSignIdx < 0) {
            key = pair;
        }
        else {
            key = pair.slice(0, equalSignIdx);
            value = pair.slice(equalSignIdx + 1);
        }
        addPair(key, value);
    });
    return map;
}

export function serializeQuery(queryMap: QueryMap): string {
    return '';
}