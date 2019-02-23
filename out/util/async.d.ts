/**
 * Async utilites for arrays, inspired by William Lohan
 * https://stackoverflow.com/a/53508547/2016735
 */
export declare function mapAsync<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<U> | U): Promise<U[]>;
export declare function filterAsync<T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<boolean> | boolean): Promise<T[]>;
