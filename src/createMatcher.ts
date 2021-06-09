import {Route, RouteConfig} from "./models/route";
import {RouteMatchFn} from "./models/match";
import {RawLocation} from "./models/location";

function createMatcher(routes: RouteConfig[]): RouteMatchFn {
    return function match(location: RawLocation): Route {
        return { path: '' };
    }
}

export default createMatcher;
