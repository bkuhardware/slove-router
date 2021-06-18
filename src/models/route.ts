import {RawLocation} from "./location";

export interface RouteConfig {
    path: string;
    name?: string;
    redirect?: RawLocation;
    children?: RouteConfig[];
}

export interface Route {
    path: string;
    name?: string;
    params: { [key: string]: any };
    query: { [key: string]: any };
    redirect?: RawLocation,
    matched: RouteRecord[];
}

export type RoutePathMap = { [key: string]: RouteRecord };
export type RouteNameMap = { [key: string]: RouteRecord };
export interface RouteMap {
    pathMap: RoutePathMap,
    nameMap: RouteNameMap,
    paths: string[];
}

export interface RouteRecord {
    path: string;
    name?: string;
    redirect?: RawLocation;
    parent: RouteRecord | null;
}
