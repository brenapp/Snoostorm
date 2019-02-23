import Poll from "./classes/Poll";
import * as Snoowrap from "snoowrap";
import { ListingOptions } from "snoowrap/dist/objects";
export interface SnooStormOptions extends ListingOptions {
    pollTime?: number;
    subreddit?: string;
}
export declare const DefaultOptions: SnooStormOptions;
export declare class CommentStream extends Poll<Snoowrap.Comment> {
    constructor(client: Snoowrap, options?: SnooStormOptions);
}
export declare class SubmissionStream extends Poll<Snoowrap.Submission> {
    constructor(client: Snoowrap, options?: SnooStormOptions);
}
export declare class InboxStream extends Poll<Snoowrap.Comment | Snoowrap.PrivateMessage> {
    constructor(client: Snoowrap, options?: {
        filter: "inbox" | "unread" | "messages" | "comments" | "selfreply" | "mentions ";
        pollTime: number;
    });
}
