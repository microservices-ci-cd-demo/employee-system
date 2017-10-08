'use strict';

const express = require('express');
const url = require('url');
const app = express();

app.use(express.static('public'))

app.get('/api/employee', function (req, res) {
  const employeeId = url.parse(req.url, true).query.id;
  const employee = employees[employeeId];
  employee ? res.json(employee) : res.status(404).send({"error": "Not Found"});
});

module.exports = app;
