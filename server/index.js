'use strict';

const express = require('express');
const request = require('request');
const url = require('url');
const app = express();

const EMPLOYEE_INFO_SERVICE_URL = process.env.EMPLOYEE_INFO_SERVICE_URL || 'http://localhost:3000'
const EMPLOYEE_PAYROLL_SERVICE_URL = process.env.EMPLOYEE_PAYROLL_SERVICE_URL || 'http://localhost:4000'

app.use(express.static('public'))

app.get('/api/info', function (req, res) {
  const id = url.parse(req.url, true).query.id;
  const getEmpURL = EMPLOYEE_INFO_SERVICE_URL + '/api/employee?id=' + id;
  const getEmpPayrollURL = EMPLOYEE_PAYROLL_SERVICE_URL + '/api/employee_payroll?id=' + id;
  request(getEmpURL, function (error, response, body) {
    if(response.statusCode != 200){
      return res.json(body)
    }
    request(getEmpPayrollURL, function (error, response, payrollbody) {
      res.send(Object.assign(JSON.parse(body), JSON.parse(payrollbody)));
    });
  });
});

module.exports = app;
