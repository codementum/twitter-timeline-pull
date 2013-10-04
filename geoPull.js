// run as `node getGeo.js lat lon radius maxTweets
var ntwitter  = require('ntwitter')
  , _         = require('underscore')
  , fs        = require('fs')
  , dataset   = []
  , allData   = []
  , twit

  var params = {
    lat       : process.argv[2],
    lon       : process.argv[3],
    radius    : process.argv[4],
    maxTweets : process.argv[5]
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
        console.log(params)
//        getTweets(params, null, finishUp)
    })
  })
}

function getTweets(params, maxid, cb){
  params.count = 200;

  if( maxid ) params.max_id = maxid

    // TODO use search instead
    // TODO put params in search
  twit.getUserTimeline(params, function(err, data) {
    if( err ) console.log(err)

    if( dataset.length < maxTweets && data.length > 1 ){
      dataset = dataset.concat(data)
      var min = _.min(dataset, function(d) { return d.id }).id

      setTimeout( function() { 
        getTweets(user, min, cb) 
      }, 5100)

    } else {
      // TODO can probably finish up here
      cb()
    }

  })
}

//function concatAndMoveOn(d) {
//  dataset = []
//  nextUser()
//}

//function nextQuery() {
//  if( dataset.length >= maxTweets ) { 
//    finishUp()
//    return
//  }
//  var user = users.pop()
//  getTweets(user, null, concatAndMoveOn)
//}

function finishUp() {
  allData = allData.concat(dataset)
  console.log( JSON.stringify(allData) )
}
