var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  if (/^http:\/\/giphy\.com\/\S+/.test(term)) {
    // Special-case: handle strings in the special URL form that are suggested by the /typeahead
    // API. This is how the command hint menu suggests an exact Giphy image.
    handleIdString(term.replace(/^http:\/\/giphy\.com\//, ''), req, res);
  } else {
    // Else, if the user was typing fast and press enter before the /typeahead API can respond,
    // Mixmax will just send the text to the /resolver API (for performance). Handle that here.
    handleSearchString(term, req, res);
  }
};

function handleIdString(id, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'http://api.giphy.com/v1/gifs/' + encodeURIComponent(id),
      qs: {
        api_key: key
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var image = response.body.data.images.original;
  var width = image.width > 600 ? 600 : image.width;
  var html = '<img style="max-width:100%;" src="' + image.url + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}

function handleSearchString(term, req, res) {
  console.log("inside resolver handleSearchString");
  console.log(term);
  if(term=="conclude"){
    res.json([{
      title: '<i>(conclude)</i>',
      text: 'Looking forward to hear from you. Thank you and have a great day ahead.'
    }]);
  }else if(term=="start"){

    res.json([{
      title: '<i>(start)</i>',
      text: 'Greetings for the day !!'
    }]);
  }

}
