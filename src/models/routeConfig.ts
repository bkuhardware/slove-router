export default interface RouteConfig {
    path: string;
    name?: string;
    children?: RouteConfig[];
}
