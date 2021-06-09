import install from "./install";
import Vue, {VueConstructor} from "vue";
import SloveRouterOptions from "./models/sloveRouterOptions";
import {RouteConfig} from "./models/route";
import {RouteMatchFn} from "./models/match";
import createMatcher from "./createMatcher";
import RouteHistory from "./RouteHistory";

export default class SloveRouter {
    static install: (Vue: VueConstructor) => void;
    baseUrl: string;
    _rootComponent: Vue | null = null;
    match: RouteMatchFn;
    history: RouteHistory;

    constructor(options: SloveRouterOptions) {
        this.baseUrl = options.baseUrl || '/';
        const routes: RouteConfig[] = options.routes || [];
        this.match = createMatcher(routes);
        this.history = new RouteHistory(this);
    }
}

SloveRouter.install = install;
