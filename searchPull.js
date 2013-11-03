// run as `node searchPull.js term maxTweets
var ntwitter  = require('ntwitter')
  , _         = require('underscore')
  , fs        = require('fs')
  , term      = process.argv[2]
  , maxTweets = process.argv[3]
  , dataset   = []
  , allData   = []
  , twit

var params = {
  count: 100,
  include_rts: false
}


init()

function init() {
  // To run this, you will need your own keys.
  fs.readFile('twitterKeys.json', 'utf8', function (err, data) {
    if (err) console.log(err)
    var keys = JSON.parse(data)
    twit = new ntwitter(keys)

    twit.verifyCredentials(function (err, data) {
      if(typeof data === 'undefined')
        console.log('twitter keys error')
      else
        getTweets(term, params, null, finishUp)
    })
  })
}

// example url: https://api.twitter.com/1.1/search/tweets.json?q=&geocode=-22.912214,-43.230182,1km&lang=pt&result_type=recent
function getTweets(term, params, max_id, cb){
  if( max_id ) params.max_id = max_id

  twit.search(term, params, function(err, data) {
    if( err ) console.log(err)

    if( dataset.length < maxTweets && data.statuses.length > 1 ){
      dataset = dataset.concat(data.statuses)
      var min = _.min(dataset, function(d) { return d.id }).id

      setTimeout( function() {
        getTweets(term, params, min, cb)
      }, 5100)

    } else {
      cb()
    }

  })
}

function finishUp() {
  allData = allData.concat(dataset)
  console.log( JSON.stringify(allData) )
}
