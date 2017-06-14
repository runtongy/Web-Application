const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs591')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number
})
const string = mongoose.model('string', stringSchema)

let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        string.find({string: checkName}, function (err, results) {
            if (results.length > 0) {
                resolve({found: results})
            }
            else {
                reject({found: false})
            }
        })
    })
}

router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    let theLength = theName.length
    findByName(theName)
        .then(function (status) {
            res.json(status)
            }
        )
        .catch(function (status) {
            const theString = new string({string: theName, length: theLength})
            theString.save()
                res.json(status)
            }
        )
})

router.get('/', function (req, res, next) {
    string.find({}, function (err, results) {
        res.json(results);
    })

})

router.post('/', function (req, res, next) {
//  console.log(req.body)
    let theName = req.body.name
    if (theName === ""){
        res.send({'message':'No string is here, please provide one'})
    }
    else{
        let theLength = theName.length
        findByName(theName)
            .then(function (status) {
                    res.json(status)
                }
            )
            .catch(function (status) {
                    const theString = new string({string: theName, length: theLength})
                    theString.save()
                    res.json(status)
                }
            )
    }
})

router.delete('/:name', function (req, res, next) {
    let theName = req.params.name
    findByName(theName)
        .then( function (status) {
            string.findOneAndRemove({string:theName}, function (err,result) {
                if(err){res.json({'message':'error'})}
                else{res.json({'message':'success'})}

            })

            }

        )
        .catch(function (status) {
            res.json({'message':'string not found'})
        })
});

module.exports = router;