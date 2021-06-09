import install from "./install";
import {VueConstructor} from "vue";
import SloveRouterOptions from "./models/sloveRouterOptions";
import {Route, RouteConfig} from "./models/route";
import {RouteMatchFn} from "./models/match";
import createMatcher from "./createMatcher";
import RouteHistory from "./RouteHistory";

export default class SloveRouter {
    static install: (Vue: VueConstructor, router: SloveRouter) => void;
    baseUrl: string;
    _matched: { _route?: Route } = {};
    match: RouteMatchFn;
    history: RouteHistory;

    constructor(options: SloveRouterOptions) {
        this.baseUrl = options.baseUrl || '/';
        const routes: RouteConfig[] = options.routes || [];
        this.match = createMatcher(routes);
        this.history = new RouteHistory(this);
    }

    rerender(newMatchedRoute: Route) {
        if (!this._matched._route) {
            console.error('Slove router must be install before using.');
            return;
        }
        this._matched._route = newMatchedRoute;
    }
}

SloveRouter.install = install;
