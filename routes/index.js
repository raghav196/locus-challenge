'use strict';

const router = require('express-promise-router')();

require('./user')(router);
require('./role')(router);

module.exports = router;