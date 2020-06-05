import { EventEmitter } from "events";

type Awaitable<T> = Promise<T> | T;

// Event Typing
interface PollEvents<T> {
  item: (item: T) => void;
  listing: (items: T[]) => void;
  end: () => void;
}

export default interface Poll<T extends object> {
  on<U extends keyof PollEvents<T>>(event: U, listener: PollEvents<T>[U]): this;
  once<U extends keyof PollEvents<T>>(
    event: U,
    listener: PollEvents<T>[U]
  ): this;
  off<U extends keyof PollEvents<T>>(
    event: U,
    listener: PollEvents<T>[U]
  ): this;
}

export interface PollConfiguration<T> {
  frequency: number;
  get: () => Awaitable<T[]>;
  identifier: keyof T;
}

export default class Poll<T extends object> extends EventEmitter {
  frequency: number;
  interval: NodeJS.Timeout;

  processed: Set<T[keyof T]> = new Set();

  constructor({ frequency, get, identifier }: PollConfiguration<T>) {
    super();
    this.frequency = frequency || 2000;

    this.interval = setInterval(async () => {
      const batch = await get();

      const newItems: T[] = [];
      for (const item of batch) {
        const id = item[identifier];
        if (this.processed.has(id)) continue;

        // Emit for new items and add it to the list
        newItems.push(item);
        this.processed.add(id);
        this.emit("item", item);
      }

      // Emit the new listing of all new items
      this.emit("listing", newItems);
    }, frequency);
  }

  end() {
    clearInterval(this.interval);
    this.emit("end");
  }
}
