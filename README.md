# SnooStorm

Event-based wrapper around [`snoowrap`](https://npm.im/snoowrap)

JUST RELEASED: VERSION 1.0!

- TypeScript Rewrite
- More sensible API
- Better support for InboxStream

## Usage

Basic Usage:

```javascript
import { InboxStream, CommentStream, SubmissionStream } from "./src/main";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

const client = new Snoowrap(creds);

const comments = new CommentStream(client);
comments.on("item", console.log);

const submissions = new SubmissionStream(client);
submissions.on("item", console.log);

const inbox = new InboxStream(client);
inbox.on("item", console.log);

inbox.end();
inbox.on("end", () => console.log("And now my watch has ended"));
```
