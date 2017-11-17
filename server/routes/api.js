const express = require('express');
const router = express.Router();
const request = require('request');
const parser = require('xml2json');
const deepcopy = require("deepcopy");

/* GET api listing. */
router.get('/', (req, res) => {
  try {
    if (req.query.type) {
      if (req.query.type == 'news') {
        var xml;
        var json;
        const url = 'https://seekingalpha.com/api/sa/combined/' + req.query.name + '.xml';
        request.get(url, (error, response, body) => {
          xml = deepcopy(body);
        // console.log("input -> %s", xml);
          try{
            var json = parser.toJson(xml);
            // console.log("to json -> %s", json);
            res.send(json);
          }
          catch (err) {
            res.send('{"error":"invalid symbol:' + req.query.name + '"}');
          }
        });

      } else if (req.query.type == 'stock') {
        request({
          uri: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=' + req.query.name + '&apikey=Q77RS3RWOX3ZMH6I',
        }).pipe(res);
      } else {
        res.send('{"error":"invalid type:' + req.query.type + '"}');
      }
    } else {
      request({
        uri: 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + req.query.name,
      }).pipe(res);
    }
  }
  catch (err) {
    res.send('{"error":"request failed"}');
  }


  // res.send('[{"Symbol":"AAPL","Name":"Apple Inc","Exchange":"NASDAQ"},{"Symbol":"APLE","Name":"","Exchange":"NYSE"},{"Symbol":"APLE","Name":"Apple Hospitality REIT Inc","Exchange":"BATS Trading Inc"},{"Symbol":"VXAPL","Name":"CBOE Apple VIX Index","Exchange":"Market Data Express"}]');
});

module.exports = router;
