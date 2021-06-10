export function removeEndSlash(path: string): string {
    return (path.length <= 1 || path[path.length - 1] !== '/') ? path : path.replace(/\/$/, '');
}
