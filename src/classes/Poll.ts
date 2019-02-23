import { EventEmitter } from "events";

import { mapAsync, filterAsync } from "../util/async";

export type Awaitable<T> = Promise<T> | T;

/**
 * Represents an Abstract Poll
 */
export default class Poll<Item> extends EventEmitter {
  frequency: number;
  interval: NodeJS.Timeout;

  inventory: Item[] = [];

  constructor({
    frequency,
    get,
    filter
  }: {
    frequency: number;
    get: () => Awaitable<Item[]>;
    filter: (
      item: Item,
      index: number,
      inventory: Item[]
    ) => Awaitable<boolean>;
  }) {
    super();
    this.frequency = frequency;

    const that = this;

    this.interval = setInterval(async () => {
      const got = await filterAsync(await get(), (item, i) =>
        filter(item, i, that.inventory)
      );

      got.forEach(item => that.emit("item", item));

      that.inventory.push(...got);
    }, frequency);
  }

  end() {
    clearInterval(this.interval);
    this.emit("end");
  }
}
