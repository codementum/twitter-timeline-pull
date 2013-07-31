// run as `node getTimeline.js user1 user2 user3 ...etc`
var ntwitter  = require('ntwitter')
  , _         = require('underscore')
  , fs        = require('fs')
  , users     = process.argv.splice(2)
  , maxTweets = 3200
  , dataset   = []
  , allData   = []
  , twit

init()

function init() {
  // To run this, you will need your own keys.
  fs.readFile('twitterKeys.json', 'utf8', function (err, data) {
    if (err) console.log(err)
    var keys = JSON.parse(data)
    twit = new ntwitter(keys)
    twit.verifyCredentials(function (err, data) {
      if(typeof data === 'undefined')
        console.log('twitter keys error');
      else
        nextUser()
    })
  })
}

function getTweets(user, maxid, cb){
  var params = {
    screen_name: user,
    count: 200,
    include_rts: true
  }

  if( maxid ) params.max_id = maxid

  twit.getUserTimeline(params, function(err, data) {
    if( err ) console.log(err)

    if( dataset.length < maxTweets && data.length > 1 ){
      dataset = dataset.concat(data)
      var min = _.min(dataset, function(d) { return d.id }).id

      setTimeout( function() { 
        getTweets(user, min, cb) 
      }, 5100)

    } else {
      cb(dataset)
    }

  })
}

function concatAndMoveOn(d) {
  allData = allData.concat(dataset)
  dataset = []
  nextUser()
}

function nextUser() {
  if(users.length < 1) { 
    finishUp()
    return
  }
  var user = users.pop()
  getTweets(user, null, concatAndMoveOn)
}

function finishUp() {
  console.log( JSON.stringify(allData) )
}
