var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {


  var term = req.query.text.trim();
  console.log(term);
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }
  else if(term=="conclude"){

    console.log("captured conclude command");

    res.json([{
      title: '<i>(end)</i>',
      text: 'Looking forward to hear from you. Thank you and have a great day ahead.'
    }]);
  }else if(term=="start"){

    res.json([{
      title: '<i>(start)</i>',
      text: 'Greetings for the day !!'
    }]);

  }
};
