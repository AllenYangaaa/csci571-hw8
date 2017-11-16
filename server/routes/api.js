const express = require('express');
const router = express.Router();
const request = require('request');

/* GET api listing. */
router.get('/', (req, res) => {
  request({
            uri: 'http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=' + req.query.name,
          }).pipe(res);
  // res.send('[{"Symbol":"AAPL","Name":"Apple Inc","Exchange":"NASDAQ"},{"Symbol":"APLE","Name":"","Exchange":"NYSE"},{"Symbol":"APLE","Name":"Apple Hospitality REIT Inc","Exchange":"BATS Trading Inc"},{"Symbol":"VXAPL","Name":"CBOE Apple VIX Index","Exchange":"Market Data Express"}]');
});

module.exports = router;
