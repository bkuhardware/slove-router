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
    const parts: string[] = pathConfig.split('/');
    for (let i = 0; i < parts.length; ++i) {
        const part: string = parts[i];
        if (part && part[0] === ':') {
            const paramName: string = part.slice(1);
            if (paramName && params[paramName] != undefined) {
                parts[i] = params[paramName];
            }
        }
    }
    return parts.join('/');
}

export function matchPath(path: string, pathConfig: string): boolean {
    const parts: string[] = path.split('/');
    const configParts: string[] = pathConfig.split('/');
    if (parts.length < configParts.length)
        return false;
    let wildcardFlag: boolean = false;
    for (let i = 0; i < configParts.length; ++i) {
        const configPart: string = configParts[i];
        if (configPart === '*') {
            wildcardFlag = true;
            continue;
        }
        if (configPart[0] !== ':') {
            if (configPart !== parts[i])
                return false;
        }
    }
    return wildcardFlag || (parts.length === configParts.length);
}

export function extractParams(path: string, pathConfig: string): ParamMap {
    const params: ParamMap = {};
    const parts: string[] = path.split('/');
    const configParts: string[] = pathConfig.split('/');
    for (let i = 0; i < configParts.length; ++i) {
        const configPart: string = configParts[i]
        if (configPart && configPart[0] === ':') {
            const key: string = configPart[0].slice(1);
            if (key) {
                params[key] = parts[i];
            }
        }
    }
    return params;
}