var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?location=boston',
        headers:{'Authorization':
            'Bearer i-8DFyaRM0zNLa1qCG7KjiPjHfn0sCSw323Yp1jSVUZ-dWuPbyT2kHSgoGCJoP1_ch-K-FNe_3SXhUh5h7My6sRhhkKOsb4cOFc2BUGH2ncub4TPECAo0tFaZ05QWXYx'}
    };

    request(options, function(error, response, body){
        if(error) throw new Error(error);
        let result = JSON.parse(response.body)
        let rating = result.businesses

        res.json(rating)

    });

})

module.exports = router;