var express = require('express');
var router = express.Router();

var multer  = require('multer'),
    multerS3 = require('multer-s3'),
    fs = require('fs'),
    AWS = require('aws-sdk');

AWS.config.loadFromPath('./s3_config.json');
var s3 = new AWS.S3();


router.post('/createBucket',function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName };
    s3.createBucket(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
})


router.get('/listBuckets',function (req, res) {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
})





router.post('/uploadFile',function (req, res) {
    var params = {
        Bucket: "my.examplebucket.amrish", 
        Key: "5IdG6zYOlWGYhbS2xvIeLYEb0uOrUi2xPqNT3o/4",
        Body:req
       };
       
       s3.upload(params, function(err, data) {
         if (err) console.log(err, err.stack); // an error occurred
         else     console.log(data);           // successful response
         
       });
})


module.exports = router;