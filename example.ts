import {
  InboxStream,
  CommentStream,
  SubmissionStream,
  ModMailStream
} from "./src/main";
import Snoowrap from "snoowrap";

const creds = require("./credentials.json");

// Create snoowrap object
const r = new Snoowrap(creds);

// Modmail test
const modmail = new ModMailStream(r, {});
modmail.on("item", console.log);
