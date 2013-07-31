/* 
 * usage: `node convert.js infile [> outfile]`
 * variables:
 *
 *   - input file: json file
 *   - output file: csv file
 *
 * example:
 * 
 *   - input file: dataset.json
 *   - output file: dataset.csv
 *   - fields: screen_name, created_at, retweet_count, favorite_count, text
 *
 *     node convert.js dataset.json screen_name created_at retweet_count favorite_count text > dataset.csv
 */   

var j2c    = require('json2csv')
  , fs     = require('fs')
  , file   = process.argv[2]
  , _      = require('underscore')
  , fields  = process.argv.splice(3)
  , data

fs.readFile(file, 'utf8', function (err, data) {
  if (err) console.log(err)
  data = JSON.parse(data)
  adjust(data)
  convert(data)
})

function convert(d) {
  var params = {
    data: d,
    fields: fields
  }
  j2c(params, function(err, csv) {
    if (err) console.log(err)
    console.log(csv)
  })
}

// Twitter screen names are stored in the user json object.
// This doesn't work well with the CSV conversion, so adjust() moves the screen-name higher in the hierarchy.
// TODO this step be it's own script.
function adjust(d) {
  return _.map(d, function(o) {
    o.screen_name = o.user.screen_name
  });
}
