const express = require('express')
const router = express.Router()

const authorized = require('./authCheck')

const mongoose = require('mongoose')
if (!mongoose.connection.db) {
    mongoose.connect('mongodb://localhost/cs591')
}
const db = mongoose.connection
const Schema = mongoose.Schema
const Rate1Schema = new Schema({
    name      : String,
    rating    : Number
})
const Rate1 = mongoose.model('rate1', Rate1Schema)

const Rate2Schema = new Schema({
    name      : String,
    rating    : Number
})
const Rate2 = mongoose.model('rate2', Rate2Schema)

router.get('/rate1', function(req, res, next){
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?location=boston&term=nudpub',
        headers:{'Authorization':
            'Bearer i-8DFyaRM0zNLa1qCG7KjiPjHfn0sCSw323Yp1jSVUZ-dWuPbyT2kHSgoGCJoP1_ch-K-FNe_3SXhUh5h7My6sRhhkKOsb4cOFc2BUGH2ncub4TPECAo0tFaZ05QWXYx'}
    };

    request(options, function(error, response, body){
        if(error) throw new Error(error);
        let result = JSON.parse(response.body);
        let rating1 = new Rate1({name: result.businesses[0].name, rating: result.businesses[0].rating});
        rating1.save();
        res.send("Saving Done")
    });
})

router.get('/rate1update', function(req, res, next){
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/search?location=boston&term=nudpub',
        headers:{'Authorization':
            'Bearer i-8DFyaRM0zNLa1qCG7KjiPjHfn0sCSw323Yp1jSVUZ-dWuPbyT2kHSgoGCJoP1_ch-K-FNe_3SXhUh5h7My6sRhhkKOsb4cOFc2BUGH2ncub4TPECAo0tFaZ05QWXYx'}
    };

    request(options, function(error, response, body){
        if(error) throw new Error(error);
        let result = JSON.parse(response.body);
        Rate1.findOneAndUpdate({name: result.businesses[0].name}, {rating: result.businesses[0].rating},
        function (error, result) {
            res.send(result);
        });
    });
})


router.get('/rate2', function (req, res, next) {
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
        let rating2 = new Rate2({name: result.restaurants[0].restaurant.name,
            rating: result.restaurants[0].restaurant.user_rating.aggregate_rating})
        rating2.save();
        res.send("Saving Done")
    });
})

router.get('/rate2update', function (req, res, next) {
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
        Rate2.findOneAndUpdate({name: result.restaurants[0].restaurant.name},
            {rating: result.restaurants[0].restaurant.user_rating.aggregate_rating},
            function (error, result) {
                res.send(result);
            });
    });
})

module.exports = router