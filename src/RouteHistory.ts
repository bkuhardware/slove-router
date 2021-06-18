import SloveRouter from "./index";
import {Route} from "./models/route";
import {removeEndSlash} from "./helpers/path";
import {RawLocation} from "./models/location";
import {AfterHookFn, BeforeHookFn} from "./models/hook";

export default class RouteHistory {
    router: SloveRouter;
    current: Route | null;
    baseUrl: string;
    beforeHooks: BeforeHookFn[] = [];
    afterHooks: AfterHookFn[] = [];

    constructor(router: SloveRouter, baseUrl: string) {
        this.router = router;
        this.baseUrl = removeEndSlash(baseUrl);
        this.current = this.router.match(this.getCurrentLocation(), null);
    }

    getCurrentLocation(): string {
        const path: string = window.location.href;
        if (!this.checkPathFormat(path)) {
            console.error(`Invalid path format, must start with ${this.baseUrl}`);
            return '';
        }
        return path.slice(this.baseUrl.length) || '/';
    }

    checkPathFormat(path: string): boolean {
        if (path.length < this.baseUrl.length)
            return false;
        return path.slice(0, this.baseUrl.length) === this.baseUrl;
    }

    push(location: RawLocation) {
        this.transitionTo(location, (fullPath: string) => {
            window.history.pushState({}, '', fullPath);
        });
    }

    replace(location: RawLocation) {
        this.transitionTo(location, (fullPath: string) => {
            window.history.replaceState({}, '', fullPath);
        });
    }

    go(n: number) {
        window.history.go(n);
    }

    transitionTo(location: RawLocation, historyCb: (path: string) => void) {
        this.current = this.router.match(location, this.current);
        if (!this.current)
            return;

        historyCb(this.current.path);
        this.router.rerender(this.current);
        this.runAfterHooks(this.current);
    }

    runAfterHooks(route: Route) {
        this.afterHooks.forEach((hook) => {
            hook(route);
        });
    }

    addBeforeHook(hook: BeforeHookFn) {
        this.beforeHooks.push(hook);
    }

    addAfterHook(hook: AfterHookFn) {
        this.afterHooks.push(hook);
    }
}
