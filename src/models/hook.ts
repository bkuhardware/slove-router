import {Route} from "./route";
import {RawLocation} from "./location";

export type NextFn = (_: RawLocation | false) => void;

export type BeforeHookFn = (to: Route, from: Route, next: NextFn) => void;

export type AfterHookFn = (route: Route) => void;