import install from "./install";
import {VueConstructor} from "vue";
import SloveRouterOptions from "./models/sloveRouterOptions";

export default class SloveRouter {
    static install: (Vue: VueConstructor) => void;
    baseUrl: string;

    constructor(options: SloveRouterOptions) {
        this.baseUrl = options.baseUrl || '/';
    }
}

SloveRouter.install = install;
