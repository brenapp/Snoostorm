import { InboxStream, CommentStream, SubmissionStream } from "./src/main";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

console.log(creds);

const r = new Snoowrap(creds);

const stream = new CommentStream(r, { subreddit: "all", limit: 25 });

stream.on("item", console.log);
