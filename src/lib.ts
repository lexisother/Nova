import FileManager from './modules/storage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isType(value: any, type: any): boolean {
    if(value === undefined && type === undefined) return true;
    if (value === null && type === null) return true;
    else return value !== undefined && value !== null && value.constructor === type;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function select<T>(value: any, fallback: T, type: Function, isArray = false): T {
    if (isArray && isType(value, Array)) {
        for (let item of value) if (!isType(item, type)) return fallback;
        return value;
    } else if (isType(value, type)) return value;
        else return fallback;
}

export interface GenericJSON {
    [key: string]: unknown;
}

export abstract class GenericStructure {
    private __meta__!: string;

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(tag?: string) {
        Object.defineProperty(this, "__meta__", {
            value: tag || "generic",
            enumerable: false
        });
    }

    public save(asynchronous = true): void {
        FileManager.write(this.__meta__, this, asynchronous);
    }
}