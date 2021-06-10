import {VueConstructor} from "vue";
import SloveRouterView from "./components/SloveRouterView";
import SloveRouterLink from "./components/SloveRouterLink";
import SloveRouter from "./index";

let _Vue: VueConstructor | null = null;

function install(Vue: VueConstructor, router: SloveRouter = new SloveRouter({})) {
    if (_Vue) {
        console.error('Slove Router has already been installed.');
        return;
    }
    _Vue = Vue;
    _Vue.component('router-view', SloveRouterView);
    _Vue.component('router-link', SloveRouterLink);
    _Vue.set(router, '__matchedRoute__', router.history.current);
    Object.defineProperties(Vue.prototype, {
        $router: {
            get() { return router; }
        },
        $route: {
            get() { return router.__matchedRoute__; }
        }
    });
}

export default install;
