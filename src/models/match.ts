import {RawLocation} from "./location";
import {Route} from "./route";

export type RouteMatchFn = (location: RawLocation, currentRoute: Route | null) => Route | null;
