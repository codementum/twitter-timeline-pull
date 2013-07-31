twitter-timeline-pull
=====================

Pulling tweets for multiple users requires two steps:

1. Pull raw tweets and output to data.json.
2. Convert data.json to data.csv.


Setup: 
---

    npm install ntwitter
    npm install json2csv
    npm install underscore

You *must* update twitterKeys.json with [your Twitter api keys](https://github.com/AvianFlu/ntwitter#setup-api). The ones I've left in there are fake.

Usage Example: 
---

First, pull raw tweets for a set of users:

    node getTimeline.js laneharrison seeingstructure > data.json

Next, specify fields and convert to csv:

    node convert.js dataset.json screen_name retweet_count > data.csv

More info on possible fields can be found on [Twitter's dev site](https://dev.twitter.com/docs/platform-objects/tweets).
