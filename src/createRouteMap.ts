import {RouteConfig, RouteMap, RouteNameMap, RoutePathMap, RouteRecord} from "./models/route";

function createRouteMap(routes: RouteConfig[]): RouteMap {
    const pathMap: RoutePathMap = {};
    const nameMap: RouteNameMap = {};
    const paths: string[] = [];

    function addRoute(route: RouteConfig, parent: RouteRecord | null): void {
        if (route.name && nameMap[route.name]) {
            console.error(`Duplicate route name ${route.name}. This route and its children won't be processed.`);
            return;
        }
        const normalizedPath: string = normalizePath(route.path, parent?.path || '');
        const isReplaceParentPath: boolean = isRootPath(route.path) && Boolean(parent);
        if (!isReplaceParentPath && pathMap[normalizedPath]) {
            console.error(`Duplicate route path ${normalizedPath}. This route and its children won't be processed.`);
            return;
        }
        const routeRecord: RouteRecord = {
            path: normalizedPath,
            name: route.name,
            redirect: route.redirect,
            parent
        };
        pathMap[normalizedPath] = routeRecord;
        if (!isReplaceParentPath)
            paths.push(normalizedPath);
        else if (parent?.name)
            delete nameMap[parent?.name];
        if (route.path !== '*' && route.name)
            nameMap[route.name] = routeRecord;
        if (!isNoChildrenPath(route.path) && route.children)
            handleRoutes(route.children, routeRecord);
    }

    function handleRoutes(routes: RouteConfig[], parent: RouteRecord | null): void {
        let wildCard: RouteConfig | null = null;
        routes.forEach((route: RouteConfig) => {
            if (route.path === '*') {
                wildCard = route;
                return;
            }
            addRoute(route, parent);
        });
        wildCard && addRoute(wildCard, parent);
    }

    handleRoutes(routes, null);
    return {
        pathMap,
        nameMap,
        paths
    };
}

export default createRouteMap;

function normalizePath(path: string, parentPath: string): string {
    if (path === '*' && !parentPath)
        return '*';
    if (!path || path[0] !== '/')
        path = '/' + path;
    path = parentPath + path;
    return path === '/' ? path : path.replace(/\/$/, '');
}

function isRootPath(path: string): boolean {
    return path === '/' || !path;
}

function isNoChildrenPath(path: string): boolean {
    return path === '*' || isRootPath(path);
}
