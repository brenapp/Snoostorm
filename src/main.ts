import Poll from "./util/Poll";
import * as Snoowrap from "snoowrap";
import { ListingOptions, ModmailConversation } from "snoowrap/dist/objects";

export interface SnooStormOptions extends ListingOptions {
  pollTime?: number;
  subreddit?: string;
}

export const DefaultOptions: SnooStormOptions = {
  pollTime: 2000,
  limit: 50,
  subreddit: "all",
};

export class CommentStream extends Poll<Snoowrap.Comment> {
  constructor(client: Snoowrap, options: SnooStormOptions = DefaultOptions) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getNewComments(options.subreddit, options)
    });
  }
}

export class SubmissionStream extends Poll<Snoowrap.Submission> {
  constructor(client: Snoowrap, options: SnooStormOptions = DefaultOptions) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getNew(options.subreddit, options)
    });
  }
}

export interface InboxStreamOptions {
  filter:
    | "inbox"
    | "unread"
    | "messages"
    | "comments"
    | "selfreply"
    | "mentions";
  pollTime: number;
  limit: number;
}

export class InboxStream extends Poll<
  Snoowrap.Comment | Snoowrap.PrivateMessage
> {
  constructor(
    client: Snoowrap,
    options: InboxStreamOptions = {
      filter: "inbox",
      pollTime: 2000,
      limit: 5,
    }
  ) {
    super({
      frequency: options.pollTime,
      get: async () => client.getInbox(options)
    });
  }
}

export class ModMailStream extends Poll<Snoowrap.PrivateMessage> {
  constructor(
    client: Snoowrap,
    options: SnooStormOptions & { entity?: string } = DefaultOptions
  ) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getModmail(options)
    });
  }
}


export class ModQueueStream extends Poll<
  Snoowrap.Submission | Snoowrap.Comment
> {
  constructor(
    client: Snoowrap,
    options: SnooStormOptions & { subreddit: string }) {
    super({
      frequency: options.pollTime || 2000,
      get: async () => client.getSubreddit(options.subreddit).getModqueue(options)
    });
  }
}

export { Poll };
