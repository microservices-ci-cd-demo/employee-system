'use strict';

const server = require('./server');
const port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log('Employee System is running on port %d', port);
});
