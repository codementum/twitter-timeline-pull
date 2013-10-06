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

Timeline Usage Example: 
---

First, pull raw tweets for a set of users:

    node getTimeline.js laneharrison seeingstructure > data.json

Next, specify fields and convert to csv:

    node convert.js dataset.json screen_name retweet_count > data.csv

More info on possible fields can be found on [Twitter's dev site](https://dev.twitter.com/docs/platform-objects/tweets).

Geo Usage Example: 
---

First, pull raw tweets for a given location:

    node getGeo.js 40.67 73.94 1mi 200 > data.json

Note the parameters are `node getGeo.js lat lon radius maxTweets`.

Next, similarly to the timeline pull:

    node convert.js dataset.json screen_name created_at retweet_count text  > data.csv
