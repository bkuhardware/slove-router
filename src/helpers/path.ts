import {ParamMap} from "../models/location";

export function getAbsolutePath(path: string, parentPath: string): string {
    if (path && path[0] === '/')
        return path;
    return parentPath + '/' + path;
}

export function removeEndSlash(path: string): string {
    return (path.length <= 1 || path[path.length - 1] !== '/') ? path : path.replace(/\/$/, '');
}

export function getPathByParams(pathConfig: string, params: ParamMap): string {
    return '';
}

export function matchPath(path: string, pathConfig: string): boolean {
    return false;
}

export function extractParams(path: string, pathConfig: string): ParamMap {
    return {};
}