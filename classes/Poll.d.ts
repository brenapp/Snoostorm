import { EventEmitter } from "events";
export declare type Awaitable<T> = Promise<T> | T;
/**
 * Represents an Abstract Poll
 */
export default class Poll<Item> extends EventEmitter {
    frequency: number;
    interval: NodeJS.Timeout;
    inventory: Item[];
    constructor({ frequency, get, filter }: {
        frequency: number;
        get: () => Awaitable<Item[]>;
        filter: (item: Item, index: number, inventory: Item[]) => Awaitable<boolean>;
    });
    end(): void;
}
