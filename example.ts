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

// Friend Stream

interface FriendStreamOptions {
  pollTime?: number;
}

class FriendStream extends Poll<Snoowrap.RedditUser> {
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
