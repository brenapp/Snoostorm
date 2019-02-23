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
