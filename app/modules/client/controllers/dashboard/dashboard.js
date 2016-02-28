'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../../../../controllers/errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	mandrill = require("../../../../../config/mandril.js"),
	config = require("../../../../../config/config.js");
var crypto = require('crypto');
/**
 * connection to maria database
 */
var connect = require('../../../../models/maria.js');
var c = new connect.maria();
var mariaq = require('../../../../models/mariaq.js');


var Logger = require('../../models/logger.js'); //client logger

/**
 * save card details
 */
exports.savecontact = function(req, res) {
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	var contact = req.body.contact;
	contact.clientId = req.decoded.clientId;

	mariaq.select(c, "client_contact", "*", "email='" + contact.email + "'and clientId ='" + contact.clientId + "'", function(data) {

		if (data.data.length == 0) {


			mariaq.insert(c, "client_contact", contact, function(info) {
				 Logger.log("0",req.decoded.clientId,"6","added contact","1","1",ip);
				res.json({
					code: 200
				});

			});

		} else

		{


			res.json({
				code: 198
			});

		}
	})



};


/**
 * save card details
 */
exports.getcontact = function(req, res) {


	var clientId = req.decoded.clientId;

	mariaq.select(c, "client_contact", "*", "clientId='" + clientId + "'", function(data) {

		res.json(data);

	})


};



/**
 * update contact details
 */
exports.updatecontact = function(req, res) {

	var contact = req.body.contact;
	contact.clientId = req.decoded.clientId;
	var contacct = contact.contid;
	delete contact.contid;


	mariaq.update(c, "client_contact", contact, "contid=" +
		contacct + "",
		function(data) {
			if (data.affectedRows != 0) {
				res.json({
					code: 200
				});
			} else {
				res.json({
					code: 198
				});
			}


		})
};

/**
 * change password
 */
exports.changepassword = function(req, res) {
var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	mariaq.select(c, "client", "*", "emailId='" + req.decoded.emailId + "'", function(data) {
		if (data.cnt != 0) {
			var salt = new Buffer(data.data[0].salt, 'base64');
			var upassword = crypto.pbkdf2Sync(req.body.old, salt, 10000, 64).toString('base64');
			console.log(upassword);
			console.log(data.data[0].password);
			if (upassword == data.data[0].password) {

				var user = {};
				user.salt = crypto.randomBytes(16).toString('base64');
				var sa = new Buffer(user.salt, 'base64');
				user.password = crypto.pbkdf2Sync(req.body.new, sa, 10000, 64).toString('base64');


				mariaq.update(c, "client", user, "emailId='" +
					req.decoded.emailId + "'",
					function(data) {
						if (data.affectedRows != 0) {
							 Logger.log("0",req.decoded.clientId,"6","changed password","1","1",ip);
							res.json({
								code: 200
							});
						} else {
							res.json({
								code: 198
							});
						}


					})



			} else {
				res.json({
					code: 198
				});
			}



		} else {

			res.json({
				code: 198
			});
		}

	});



};