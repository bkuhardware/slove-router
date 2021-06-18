import {ObjectLocation, QueryMap, RawLocation} from "../models/location";
import {Route} from "../models/route";
import {getAbsolutePath} from "./path";
import {parseQuery} from "./query";

export function normalizeLocation(location: RawLocation, currentMatch: Route | null): ObjectLocation {
    if (typeof location === 'string')
        location = { path: location };
    if (location.name)
        return location;
    let queryMap: QueryMap = {};
    if (!currentMatch)
        currentMatch = { path: '/' };
    let absolutePath: string = currentMatch.path;
    if (location.path) {
        const [path, query = '']: string[] = location.path.split('?');
        absolutePath = getAbsolutePath(path, currentMatch.path);
        if (query)
            queryMap = parseQuery(query);
    }
    if (location.query) {
        queryMap = { ...queryMap, ...location.query };
    }
    return {
        path: absolutePath,
        query: queryMap
    }
}