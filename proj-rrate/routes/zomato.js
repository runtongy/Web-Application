var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    var request = require("request");

    let Token = "2873c9bc693ec59df952ec0eacf13e58";
    let zomatoAPI = 'https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&q=nud%20pub';
    let zomatoOptions = {
        headers: {
            'Accept': 'application/json',
            'user-key': '2873c9bc693ec59df952ec0eacf13e58'
        }
    };
    request.get(zomatoAPI, zomatoOptions, function (error, response) {
        if (error) throw new Error(error)
        let result = JSON.parse(response.body)
        let rating = result.restaurants[0].restaurant.user_rating.aggregate_rating

        res.json(rating)
    });
})

module.exports = router;
