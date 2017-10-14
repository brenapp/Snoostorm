const snoowrap = require("snoowrap"),
      EventEmitter = require("events");

/**
 * SnooStorm - An event based version of reddit's API
 * @param {object} client A variable to represent the client information to use, either a snoowrap object or a snoowrap configuration object
 *
 * options - specified in every stream, configuration options
 * @param {string}  [subreddit] Only get new comments from one subreddit, "subreddit+subreddit" can be used, defualts to "all"
 * @param {number} [results]   The number of new objects you expect every two seconds, should be low, defaults to 5
 */
const SnooStorm = (() => {

  // Removes duplicates of listings
  function removeDuplicates(orignal, listing, start) {
    return listing.filter(post => {
      return orignal.every(a => a.id != post.id) && post.created_utc >= start / 1000;
    });
  }

  function parseOptions(options) {
    options = options || {};
    options.subreddit = options.subreddit || "all";
    options.results = options.results  || 5;
    options.pollTime = options.pollTime || 2000;

    return options;
  }

  // Testing if a variable is a class by @Felix Kling on SO (http://stackoverflow.com/a/30760236/2016735)
  function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
  }

  return class SnooStorm {
    constructor(client) {
      this.client = isClass(client) ? client : new snoowrap(client);
    }

    CommentStream(options) {
      options = parseOptions(options);

      let lastBatch = [],
          event     = new EventEmitter(),
          start     = Date.now();

      let client = this.client;

      let id = setInterval(() => {
        client.getNewComments(options.subreddit, {
          limit: options.results
        })
        .then(listing => {
          removeDuplicates(lastBatch, listing, start)
            .forEach(post => {
              event.emit("comment", post);
            });

          lastBatch = listing;
        });
      }, options.pollTime);

      event.on("stop", () => {
        clearInterval(id)
      });

      return event;
    }

    SubmissionStream(options) {
      options = parseOptions(options);

      let lastBatch = [],
          event     = new EventEmitter(),
          start     = Date.now();

      let client = this.client;

      let id = setInterval(() => {
        client.getNew(options.subreddit, {
          limit: options.results
        })
        .then(listing => {
          removeDuplicates(lastBatch, listing, start)
            .forEach(post => {
              event.emit("submission", post);
            });

          lastBatch = listing;
        })
        .catch(error => {
            event.emit("error", error);
        });
      }, options.pollTime);

      event.on("stop", function() {
        clearInterval(id)
      });

      return event;
    }

  };
})();

module.exports = SnooStorm;
