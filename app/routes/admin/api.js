'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('../../../config/config.js');
var apiRoutes = express.Router();
var async = require('async');
var connect = require('../../../app/models/maria.js');
var stores = require('../../../app/modules/admin/controllers/store.js');
var stproducts = require('../../../app/modules/admin/controllers/product.js');


var c = new connect.maria();
c.on('connect', function() {
        console.log('MariaDB: Conneted to Sales Predictor Authentication DB !');
    })
    .on('error', function(err) {
        console.log('MariaDB error: ' + err);
    })
    .on('close', function(hadError) {
        console.log('MariaDB closed');
    });

module.exports = function(app) {
    app.use('/admin/api', apiRoutes); //renaming api roots

    apiRoutes.post('/auth', function(req, res) {
        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log(ip);
        var userId = req.body.data.userEmail;
        var password = req.body.data.password;
        var data = [];
        c.query('select * from admin where username="' + userId + '"AND password="' + password + '"')
            .on('result', function(resrow) {
                resrow.on('row', function(row) {
                        data.push(row);
                    })
                    .on('error', function(err) {
                        console.log('Result error: ' + inspect(err));
                    })
                    .on('end', function(info) {
                        if (data.length > 0) {
                            console.log(data[0].adminId)
                                // if user is found and password is right
                                // create a token
                            var token = jwt.sign(data, config.adminSecret, {
                                expiresInMinutes: 1440 // expires in 24 hours
                            });
                            res.json({
                                code: 200,
                                success: true,
                                message: 'Enjoy your token!',
                                token: token,
                                admin: data[0]
                            });
                        } else {
                            res.json({
                                code: 198,
                                success: false,
                                message: 'Invalid credentials',
                            });
                        }
                    });
            });
    });

    //every request to api must authenticated
    apiRoutes.use(function(req, res, next) {
      console.log("Inside the middleware !");
      var token = req.body.token || req.param('token') || req.headers['x-access-token'];
      var uType = req.body.uType;
      console.log("Token"+token);
        console.log("uType"+uType);

        console.log("config.adminSecret ::"+config.adminSecret);
          console.log("config.clientSecret ::"+config.clientSecret);

      if(uType) //if uType is set
      {
        switch (uType) {
          case 'client':
          if (token) {
          jwt.verify(token, config.clientSecret, function(err, decoded) {
              if (err) {
                  return res.json({
                      success: false,
                      message: 'Failed to authenticate token.'
                  });
              } else {
                  req.decoded = decoded;
                  next();
              }
          });
          } else {
              return res.status(403).send({
                  success: false,
                  message: 'No token provided.'
              });
          }
            break;
        } //switch ends

      }
      else {
        console.log("No uType found");
        // decode token
        if (token) {
          jwt.verify(token, config.adminSecret, function(err, decoded) {
          if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
          });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
      }
    });

    apiRoutes.post('/add-store', stores.insertStore);
    apiRoutes.post('/remove-store', stores.removeStore);
    apiRoutes.get('/get-all-stores', stores.getStores);

    apiRoutes.post('/add-product', stproducts.insertProduct);
    apiRoutes.post('/remove-product', stproducts.removeProduct);
    apiRoutes.get('/get-all-products-now', stproducts.getProducts);

}; //module.exports ends here
