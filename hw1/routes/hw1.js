const express = require('express');
const router = express.Router();


router.get('/:name', function (req, res, next) {
    let theName = req.params.name
    let theLength = req.params.length
    let rtvalue = {"String": theName, "Length": theLength}
    res.json(rtvalue)
//    next()
})

router.param('name', function (req, res, next, value) {
    console.log('got', value)
    let main = req.params.name
    req.params.length = main.length
    next()
})

router.post('/', function (req, res, next) {
//  console.log(req.body)
    let theName = req.body.name
    let theLength = theName.length
    let rtvalue = {"String": theName, "Length": theLength}
    res.json(rtvalue)
})

module.exports = router;
