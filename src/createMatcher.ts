import {Route, RouteConfig, RouteRecord} from "./models/route";
import {RouteMatchFn} from "./models/match";
import {ObjectLocation, ParamMap, RawLocation} from "./models/location";
import createRouteMap from "./createRouteMap";
import {normalizeLocation} from "./helpers/location";
import {extractParams, getPathByParams, matchPath} from "./helpers/path";
import {resolveMatch} from "./helpers/match";

function createMatcher(routes: RouteConfig[]): RouteMatchFn {
    const { pathMap, nameMap, paths } = createRouteMap(routes);
    return function match(location: RawLocation, currentRoute: Route | null): Route | null {
        const normalizedLocation: ObjectLocation = normalizeLocation(location, currentRoute);
        if (normalizedLocation.name) {
            if (!nameMap[normalizedLocation.name])
                return null;
            const record: RouteRecord = nameMap[normalizedLocation.name];
            const params: ParamMap = normalizedLocation.params || {};
            const path: string = getPathByParams(record.path, params);
            return {
                path,
                name: normalizedLocation.name,
                query: normalizedLocation.query,
                params,
                redirect: record.redirect,
                matched: resolveMatch(record)
            };
        }
        const normalizedPath: string = normalizedLocation.path || '';
        for (let i = 0; i < paths.length; ++i) {
            const pathConfig: string = paths[i];
            if (matchPath(normalizedPath, pathConfig)) {
                const record: RouteRecord = pathMap[pathConfig];
                const params: ParamMap = extractParams(normalizedPath, pathConfig);
                return {
                    path: normalizedPath,
                    name: record.name,
                    query: normalizedLocation.query,
                    params,
                    redirect: record.redirect,
                    matched: resolveMatch(record)
                };
            }
        }
        return null;
    }
}

export default createMatcher;