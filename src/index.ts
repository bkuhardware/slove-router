import install from "./install";
import {VueConstructor} from "vue";
import SloveRouterOptions from "./models/sloveRouterOptions";
import {Route, RouteConfig} from "./models/route";
import {RouteMatchFn} from "./models/match";
import createMatcher from "./createMatcher";
import RouteHistory from "./RouteHistory";
import {RawLocation} from "./models/location";

export default class SloveRouter {
    static install: (Vue: VueConstructor, router: SloveRouter) => void;
    __matchedRoute__?: Route;
    match: RouteMatchFn;
    history: RouteHistory;

    constructor(options: SloveRouterOptions = {}) {
        const baseUrl: string = options.baseUrl || '/';
        const routes: RouteConfig[] = options.routes || [];
        this.match = createMatcher(routes);
        this.history = new RouteHistory(this, baseUrl);
    }

    rerender(newMatchedRoute: Route) {
        if (!this.__matchedRoute__) {
            console.error('Slove router must be install before using.');
            return;
        }
        this.__matchedRoute__ = newMatchedRoute;
    }

    push(location: RawLocation) {
        this.history.push(location);
    }

    replace(location: RawLocation) {
        this.history.replace(location);
    }

    go(n: number) {
        this.history.go(n);
    }

    registerBeforeHook(hook: any): SloveRouter {
        this.history.addBeforeHook(hook);
        return this;
    }

    registerAfterHook(hook: any): SloveRouter {
        this.history.addAfterHook(hook);
        return this;
    }
}

SloveRouter.install = install;
