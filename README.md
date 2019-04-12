# SnooStorm

Event-based wrapper around [`snoowrap`](https://npm.im/snoowrap)

JUST RELEASED: VERSION 1.0!

- TypeScript Rewrite
- More sensible API
- Better support for InboxStream

## Usage

Basic Usage:

```javascript
import { InboxStream, CommentStream, SubmissionStream } from "snoostorm";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

const client = new Snoowrap(creds);

// Options object is a Snoowrap Listing object, but with subreddit and pollTime options
const comments = new CommentStream(client, { subreddit: "AskReddit", limit: 10, pollTime: 2000 });
comments.on("item", console.log);

const submissions = new SubmissionStream(client, { subreddit: "AskReddit", limit: 10, pollTime: 2000 });
submissions.on("item", console.log);

const inbox = new InboxStream(client);
inbox.on("item", console.log);

inbox.end();
inbox.on("end", () => console.log("And now my watch has ended"));
```
