import SloveRouter from "./index";
import {Route} from "./models/route";
import {removeEndSlash} from "./helpers/path";
import {RawLocation} from "./models/location";
import {AfterHookFn, BeforeHookFn, NextFn} from "./models/hook";
import {serializeQuery} from "./helpers/query";

export default class RouteHistory {
    router: SloveRouter;
    current: Route | null;
    lastRoute: Route | null = null;
    baseUrl: string;
    beforeHooks: BeforeHookFn[] = [];
    afterHooks: AfterHookFn[] = [];

    constructor(router: SloveRouter, baseUrl: string) {
        this.router = router;
        this.baseUrl = removeEndSlash(baseUrl);
        this.current = this.router.match(this.getCurrentLocation(), null);
        if (this.current?.redirect) {
            this.replace(this.current.redirect);
        }
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

    async transitionTo(location: RawLocation, historyCb?: (path: string) => void) {
        this.lastRoute = this.current;
        this.current = this.router.match(location, this.current);
        if (!this.current || !this.lastRoute)
            return;
        if (this.current.redirect) {
            this.replace(this.current.redirect);
            return;
        }
        const resolved: RawLocation | boolean = await this.runBeforeHooks(this.current, this.lastRoute);
        if (typeof resolved !== 'boolean') {
            const redirectLocation: RawLocation = resolved;
            this.replace(redirectLocation);
        }
        if (!resolved)
            return;
        const fullPath: string = this.current.path + serializeQuery(this.current.query);
        historyCb && historyCb(fullPath);
        this.router.rerender(this.current);
        this.runAfterHooks(this.current);
    }

    runAfterHooks(route: Route) {
        this.afterHooks.forEach((hook) => {
            hook(route);
        });
    }

    async runBeforeHooks(route: Route, last: Route): Promise<boolean | RawLocation> {
        return new Promise((resolve) => {
            let currentHookIndex: number = 0;
            const beforeHooks = this.beforeHooks;
            const numHook: number = beforeHooks.length;
            const runHook = () => {
                if (currentHookIndex === numHook)
                    resolve(true);
                beforeHooks[currentHookIndex](route, last, next);
            }

            const next: NextFn = (_: RawLocation | false | undefined) => {
                if (_ === undefined) {
                    currentHookIndex++;
                    runHook();
                }
                else if (_ === false) {
                    resolve(false);
                }
                else {
                    resolve(_);
                }
            }

            if (!numHook)
                resolve(true);
            runHook();
        });
    }

    addBeforeHook(hook: BeforeHookFn) {
        this.beforeHooks.push(hook);
    }

    addAfterHook(hook: AfterHookFn) {
        this.afterHooks.push(hook);
    }
}
