import {Route, RouteConfig} from "./models/route";
import {RouteMatchFn} from "./models/match";
import {RawLocation} from "./models/location";
import createRouteMap from "./createRouteMap";

function createMatcher(routes: RouteConfig[]): RouteMatchFn | null {
    const { pathMap, nameMap, paths } = createRouteMap(routes);
    return function match(location: RawLocation): Route {
        return { path: '' };
    }
}

export default createMatcher;
