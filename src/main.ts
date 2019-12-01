import Poll from "./classes/Poll";
import * as Snoowrap from "snoowrap";
import { ListingOptions, ModmailConversation } from "snoowrap/dist/objects";

export interface SnooStormOptions extends ListingOptions {
  pollTime?: number;
  subreddit?: string;
}

export const DefaultOptions: SnooStormOptions = {
  pollTime: 2000,
  limit: 5,
  subreddit: "all"
};

export class CommentStream extends Poll<Snoowrap.Comment> {
  constructor(client: Snoowrap, options: SnooStormOptions = DefaultOptions) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getNewComments(options.subreddit, options),
      filter: (item, i, inventory) => inventory.every(it => it.id !== item.id)
    });
  }
}

export class SubmissionStream extends Poll<Snoowrap.Submission> {
  constructor(client: Snoowrap, options: SnooStormOptions = DefaultOptions) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getNew(options.subreddit, options),
      filter: (item, i, inventory) => inventory.every(it => it.id !== item.id)
    });
  }
}

export class InboxStream extends Poll<
  Snoowrap.Comment | Snoowrap.PrivateMessage
> {
  constructor(
    client: Snoowrap,
    options: {
      filter:
        | "inbox"
        | "unread"
        | "messages"
        | "comments"
        | "selfreply"
        | "mentions";
      pollTime: number;
      limit: number;
    } = {
      filter: "inbox",
      pollTime: 2000,
      limit: 5
    }
  ) {
    super({
      frequency: options.pollTime,
      get: async () => client.getInbox(options),
      filter: (item, i, inventory) => inventory.every(it => it.id !== item.id)
    });
  }
}

export class ModMailStream extends Poll<ModmailConversation> {
  constructor(
    client: Snoowrap,
    options: SnooStormOptions & { entity?: string } = DefaultOptions
  ) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getNewModmailConversations(options),
      filter: (item, index, inventory) =>
        inventory.every(it => it.id !== item.id)
    });
  }
}
