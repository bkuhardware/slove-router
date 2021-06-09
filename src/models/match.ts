import {RawLocation} from "./location";
import {Route} from "./route";

export type RouteMatchFn = (location: RawLocation) => Route;
