import {VueConstructor} from "vue";
import SloveRouterView from "./components/SloveRouterView";
import SloveRouterLink from "./components/SloveRouterLink";
import SloveRouter from "./index";

function install(Vue: VueConstructor, router: SloveRouter) {
    Vue.component('router-view', SloveRouterView);
    Vue.component('router-link', SloveRouterLink);
    Vue.set(router._matched, '_route', router.history.current);
    Object.defineProperties(Vue.prototype, {
        $router: {
            get() { return router; }
        },
        $route: {
            get() { return router._matched._route; }
        }
    });
}

export default install;
