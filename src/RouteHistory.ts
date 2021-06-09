import SloveRouter from "./index";
import {Route} from "./models/route";

export default class RouteHistory {
    router: SloveRouter;
    current: Route;

    constructor(router: SloveRouter) {
        this.router = router;
        this.current = this.router.match('/');
    }
}
