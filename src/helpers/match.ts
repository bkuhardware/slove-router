import {RouteRecord} from "../models/route";

export function resolveMatch(record: RouteRecord): RouteRecord[] {
    const matchedRecord: RouteRecord[] = [];
    let recordPointer: RouteRecord | null = record;
    while (recordPointer) {
        matchedRecord.push(recordPointer);
        recordPointer = recordPointer.parent;
    }
    return matchedRecord.reverse();
}