import {
  InboxStream,
  CommentStream,
  SubmissionStream,
  ModMailStream,
  Poll,
} from "./src/main";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

// Create snoowrap object
const client = new Snoowrap(creds);

// Comments Test
const post = new CommentStream(client, {
  subreddit: "all",
  limit: 50,
});

post.on("item", (item) =>
  item.body.length > 1000 ? null : console.log(item.body)
);
