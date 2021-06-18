export interface QueryMap {
    [key: string]: string | string[];
}

export interface ParamMap {
    [key: string]: string;
}

export interface ObjectLocation {
    path?: string;
    name?: string;
    query?: QueryMap;
    params?: ParamMap;
}

export type RawLocation = string | ObjectLocation;
