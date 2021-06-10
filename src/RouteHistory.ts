import SloveRouter from "./index";
import {Route} from "./models/route";
import {removeEndSlash} from "./helpers/location";

export default class RouteHistory {
    router: SloveRouter;
    current: Route;
    baseUrl: string;

    constructor(router: SloveRouter, baseUrl: string) {
        this.router = router;
        this.baseUrl = removeEndSlash(baseUrl);
        this.current = this.router.match(this.getCurrentLocation());
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
}
