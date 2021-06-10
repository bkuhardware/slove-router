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
    __matchedRoute__?: Route;
    match: RouteMatchFn;
    history: RouteHistory;

    constructor(options: SloveRouterOptions = {}) {
        this.baseUrl = options.baseUrl || '/';
        const routes: RouteConfig[] = options.routes || [];
        this.match = createMatcher(routes);
        this.history = new RouteHistory(this);
    }

    rerender(newMatchedRoute: Route) {
        if (!this.__matchedRoute__) {
            console.error('Slove router must be install before using.');
            return;
        }
        this.__matchedRoute__ = newMatchedRoute;
    }
}

SloveRouter.install = install;
