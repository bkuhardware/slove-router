import {RawLocation} from "./location";
import {Route} from "./route";

export type RouteMatchFn = (location: RawLocation, currentLocation: Route) => Route | null;
