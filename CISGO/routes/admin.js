var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.writeHead(302, {
    Location: 'http://localhost:3001/admin'
  })
  res.end();
});

module.exports = router;