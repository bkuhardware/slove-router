import {Route} from "./route";
import {RawLocation} from "./location";

export type NextFn = (_: RawLocation | false | undefined) => void;

export type BeforeHookFn = (to: Route, from: Route | null, next: NextFn) => void;

export type AfterHookFn = (route: Route) => void;