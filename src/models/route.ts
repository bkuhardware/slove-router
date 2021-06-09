export interface RouteConfig {
    path: string;
    name?: string;
    children?: RouteConfig[];
}

export interface Route {
    path: string;
    name?: string;
}
