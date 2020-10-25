var express = require('express');
var router = express.Router();
const { User } = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(" asd",req.body);
  res.render('index', { title: 'Express' });
});
router.get('/AddUser', function(req, res, next) {
  console.log(" asd",req.body);
  const insertedGraph =  User.query(req.body)
        .insertGraph(req.body)

     // return insertedGraph
  res.render('index', { title: 'Express' });
});
module.exports = router;
