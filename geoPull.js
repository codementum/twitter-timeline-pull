// run as `node geoPull.js lat lon radius maxTweets
var ntwitter  = require('ntwitter')
  , _         = require('underscore')
  , fs        = require('fs')
  , maxTweets = process.argv[5]
  , dataset   = []
  , allData   = []
  , twit

var params = {
  geocode: process.argv[2] + ',' + process.argv[3] + ',' + process.argv[4],
  count: 100
}

init()

function init() {
  // To run this, you will need your own keys.
  fs.readFile('twitterKeysReal.json', 'utf8', function (err, data) {
    if (err) console.log(err)
    var keys = JSON.parse(data)
    twit = new ntwitter(keys)
    twit.verifyCredentials(function (err, data) {
      if(typeof data === 'undefined')
        console.log('twitter keys error')
      else
        getTweets(params, null, finishUp)
    })
  })
}

// example url: https://api.twitter.com/1.1/search/tweets.json?q=&geocode=-22.912214,-43.230182,1km&lang=pt&result_type=recent
function getTweets(params, max_id, cb){
  if( max_id ) params.max_id = max_id

  twit.search('', params, function(err, data) {
    if( err ) console.log(err)

    if( dataset.length < maxTweets && data.statuses.length > 1 ){
      dataset = dataset.concat(data.statuses)
      var min = _.min(dataset, function(d) { return d.id }).id

      setTimeout( function() { 
        getTweets(params, min, cb) 
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
