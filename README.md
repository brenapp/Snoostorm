# SnooStorm

Event-based wrapper around [`snoowrap`](https://npm.im/snoowrap)

## Usage

Basic Usage:

```javascript
import { InboxStream, CommentStream, SubmissionStream } from "snoostorm";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

const client = new Snoowrap(creds);

// Options object is a Snoowrap Listing object, but with subreddit and pollTime options
const comments = new CommentStream(client, {
  subreddit: "AskReddit",
  limit: 10,
  pollTime: 2000,
});
comments.on("item", console.log);

const submissions = new SubmissionStream(client, {
  subreddit: "AskReddit",
  limit: 10,
  pollTime: 2000,
});
submissions.on("item", console.log);

const inbox = new InboxStream(client);
inbox.on("item", console.log);

inbox.end();
inbox.on("end", () => console.log("And now my watch has ended"));
```

## Custom Polls

Out of the box, `snoostorm` supports the following objects:

- Comments
- Submissions
- Inbox
- Modmail

If you would like to poll another object in `snoowrap`, you can implement your own Poll easily. For example, here is an implementation that will poll for new friends:

```TypeScript

import { Poll } from "snoostorm"

export interface FriendStreamOptions {
  pollTime?: number;
}

export class FriendStream extends Poll<Snoowrap.RedditUser> {
  constructor(
    client: Snoowrap,
    options: FriendStreamOptions = { pollTime: 2000 }
  ) {
    super({
      frequency: options.pollTime,
      get: () => client.getFriends(),
      identifier: "name",
    });
  }
}

const friends = new FriendStream(client);

friends.on("item", (item) => {
  console.log("New Friend!", item.name);
});


```
