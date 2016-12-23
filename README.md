SnooStorm
===

An event based wrapper around snoowrap

## Usage

Basic Usage:

```javascript
var snoostorm = require("snoostorm"),
    credentials  = require("./credentials") // Load snoowrap credentials from a file

var client = new snoostorm(client);

var commentStream = client.CommentStream({
  "subreddit": "AskReddit", // optional, defaults to "all",
  "results": 5,              // The number of results to request per request, more the larger the subreddit, about how many results you should get in 2 seconds. Defaults to 5
  "pollTime": 2000           // Time in between polls in milliseconds, defaults to 2000, 30 times a minute, in accordance with Reddit's 60req/min, allowing you to perform both comment and submission updates. Note that snoowrap will automatically wait to be in compliance with Reddit's Guidelines
})

commentStream.on("comment", function(comment) {
  console.log(`New comment by ${comment.author.name}`);
});

var submissionStream = client.SubmissionStream({
  "subreddit": "AskReddit", // optional, defaults to "all",
  "results": 5              // The number of results to request per request, more the larger the subreddit, about how many results you should get in 2 seconds. Defaults to 5
})

submissionStream.on("comment", function(post) {
  console.log(`New submission by ${post.author.name}`);
});
```
