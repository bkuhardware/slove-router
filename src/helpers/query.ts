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
    let queryPairs: string[] = [];
    Object.keys(queryMap).forEach((key: string) => {
        if (typeof queryMap[key] === 'string') {
            queryPairs.push(`${key}=${queryMap[key]}`);
        }
        else {
            const values: string[] = queryMap[key] as string[];
            queryPairs.push(serializeQueryArray(key, values));
        }
    });
    return '?' + queryPairs.join('&');
}

function serializeQueryArray(key: string, values: string[]): string {
    const pairs: string[] = values.map((value: string) => `${key}=${value}`);
    return pairs.join('&');
}