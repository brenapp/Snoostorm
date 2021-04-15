import { EventEmitter } from "events";

type Awaitable<T> = Promise<T> | T;

// Event Typing
interface PollEvents<T> {
  item: (item: T) => void;
  listing: (items: T[]) => void;
  end: () => void;
  error: (e: Error) => void;
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
}

export default class Poll<T extends object> extends EventEmitter {
  frequency: number;
  interval?: NodeJS.Timeout;
  getter: () => any = () => ([]);

  constructor({ frequency, get }: PollConfiguration<T>) {
    super();
    this.frequency = frequency || 2000;
  }

  start() {
    this.interval = setInterval(async () => {
      try {
        const batch = await this.getter();

        const newItems: T[] = [];
        for (const item of batch) {
          // Emit for new items and add it to the list
          newItems.push(item);
          this.emit("item", item);
        }

        // Emit the new listing of all new items
        this.emit("listing", newItems);
      } catch (e) {
        this.emit("error", e);
      }
    }, this.frequency);
  }

  end() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.emit("end");
  }
}
