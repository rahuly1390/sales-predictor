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

var host=config.host;
var paypalc=config.paypal;
/**
 * connection to maria database
 */
var connect = require('../../../../models/maria.js');
var c = new connect.maria();
var mariaq = require('../../../../models/mariaq.js');

var Logger = require('../../models/logger.js'); //client logger


var paypal = require('paypal-rest-sdk');

paypal.configure(paypalc);

/**
 * to get country iso-numeric from countrycode
 */

var countries = require("i18n-iso-countries");



/**
 * save card details and deduct 5 dollars for confirmation
 */
exports.savecard = function(req, res) {
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	var card_data = {
		"type": req.body.type,
		"number": req.body.cardno,
		"expire_month": req.body.expdate,
		"expire_year": req.body.expyear,
		"cvv2": req.body.cvc,
		"first_name": req.body.FirstName,
		"last_name": req.body.LastName,
		"billing_address": {
			"line1": req.body.street,
			"city": req.body.city,
			"state": req.body.state,
			"postal_code": req.body.postal,
			"country_code": req.body.country
		}
	};

	/**
	 * save card
	 */

	paypal.creditCard.create(card_data, function(error, credit_card) {
		var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
		if (error) {
			res.json({
				"status": 198,
				"result": error
			});
		} else {
			if (credit_card.httpStatusCode == "201") {

				/**
				 * make transaction of 5$
				 */

				var creditCardId = credit_card.id;
				console.log(credit_card);
				var savedCard = {
					"intent": "sale",
					"payer": {
						"payment_method": "credit_card",
						"funding_instruments": [{
							"credit_card_token": {
								"credit_card_id": creditCardId
							}
						}]
					},
					"transactions": [{
						"amount": {
							"total": "5",
							"currency": "USD"

						},
						"description": "This is the payment transaction description."
					}]
				};
				paypal.payment.create(savedCard, function(error, payment) {
					console.log(payment);
					if (error) {
						res.json({
							"status": 198,
							"result": error
						});
					} else {
						if (payment.httpStatusCode == "201" && payment.state == "approved") {
							var card = {
								"clientId": req.decoded.clientId,
								"type": req.body.type,
								"cardno": credit_card.number,
								"expdate": req.body.expdate,
								"expyear": req.body.expyear,
								"FirstName": req.body.FirstName,
								"LastName": req.body.LastName,
								"street": req.body.street,
								"city": req.body.city,
								"state": req.body.state,
								"postal": req.body.postal,
								"country": req.body.country,
								"creditcard_token": creditCardId

							}
							var userr = {
								"paymentverified": 1,
								"fname": req.body.FirstName,
								"lname": req.body.LastName,
								"address1": req.body.street,
								"city": req.body.city,
								"state": req.body.state,
								"zipcode": req.body.postal,
								"country": countries.alpha2ToNumeric(req.body.country)

							};
							/**
							 *
							 * add credits
							 *
							 */


							var paymentinfo = {

								"clientId": req.decoded.clientId,
								"amount": payment.transactions[0].amount.total,
								"paypalid": payment.id,
								"paytype": payment.payer.payment_method,
								"state": payment.state
							}

							mariaq.insert(c, "client_transaction", paymentinfo, function(info) {
								if(info)
								{
										 Logger.log("0",req.decoded.clientId,"6","card transaction","1","1",ip);
								}

							});

							mariaq.update(c, "client", userr, "clientId=" + req.decoded.clientId,
								function(data) {});



							mariaq.insert(c, "payment", card, function(info) {
								 Logger.log("0",req.decoded.clientId,"6","saved credit card","1","1",ip);
								res.json({
									"status": 200,
									"result": payment
								});
							});
						} else {
							res.json({
								"status": 198,
								"result": payment
							});


						}


					}

				});
			} else {
				res.json({
					"status": 198,
					"result": credit_card
				});

			}
		}
	})



};
/**
 * make transaction
 */
exports.maketransaction = function(req, res) {
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "credit_card",
			"funding_instruments": [{
				"credit_card": {
					"type": "Visa",
					"number": "4446283280247004",
					"expire_month": "11",
					"expire_year": "2018",
					"cvv2": "705",
					"first_name": "Joe",
					"last_name": "Shopper",
					"billing_address": {
						"line1": "52 N Main ST",
						"city": "Johnstown",
						"state": "OH",
						"postal_code": "43210",
						"country_code": "US"
					}
				}
			}]
		},
		"transactions": [{
			"amount": {
				"total": "7",
				"currency": "USD",
				"details": {
					"subtotal": "5",
					"tax": "1",
					"shipping": "1"
				}
			},
			"description": "This is the payment transaction description."
		}]
	};

	paypal.payment.create(create_payment_json, function(error, payment) {
		if (error) {
			// throw error;
			res.send(error);
		} else {
			console.log("Create Payment Response");
			console.log(payment);
			res.send(payment);
		}
	});
};



/**
 * save card details
 */
exports.getlink = function(req, res) {
var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": host+"paymentv",
			"cancel_url": host+"payment"
		},
		"transactions": [{

			"amount": {
				"currency": "USD",
				"total": req.body.credit
			},
			"description": "This is the payment description."
		}]
	};


	paypal.payment.create(create_payment_json, function(error, payment) {
		if (error) {
			res.json({
				"status": 198,
				"result": error
			});
		} else {
			if (payment.httpStatusCode == "201") {
				console.log(payment);
				res.json({
					"status": 200,
					"link": payment.links[1].href
				});
			}
		}
	});

};


exports.test = function(req, res) {
var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

	var execute_payment_json = {
		"payer_id": req.body.PayerID,

	};

	var paymentId = req.body.paymentId;

	paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
		if (error) {
			res.json({
				"status": 198,
				"result": error
			});
			//throw error;
		} else {
			console.log(payment);
			if (payment.httpStatusCode == "200" && payment.state == "approved") {
				var userr = {
					"paymentverified": 1,
					"fname": payment.payer.payer_info.first_name,
					"lname": payment.payer.payer_info.last_name,
					"address1": payment.payer.payer_info.shipping_address.line1,
					"city": payment.payer.payer_info.shipping_address.city,
					"state": payment.payer.payer_info.shipping_address.state,
					"zipcode": payment.payer.payer_info.shipping_address.postal_code,
					"country": countries.alpha2ToNumeric(payment.payer.payer_info.shipping_address.country_code)
				};
				/**
				 *
				 * add credits
				 *
				 */
				var paymentinfo = {
					"clientId": req.decoded.clientId,
					"amount": payment.transactions[0].amount.total,
					"paypalid": payment.id,
					"paytype": payment.payer.payment_method,
					"state": payment.state,
					"payer_id": req.body.PayerID,


							}

							mariaq.insert(c, "client_transaction", paymentinfo, function(info) {

							});

				mariaq.update(c, "client", userr, "clientId=" + req.decoded.clientId,
					function(data) {});
				mariaq.customqry(c,"UPDATE  `billing`.`client` set `credits`=credits+500 where clientId="+ req.decoded.clientId,
					function(data) {});
				// console.log("Get Payment Response");
				// console.log(JSON.stringify(payment));

 Logger.log("0",req.decoded.clientId,"6","paypal transaction","1","1",ip);
				res.json({
					"status": 200,
					"result": payment
				});
			} else {
				res.json({
					"status": 198,
					"result": payment
				});
			}
		}
	});
}


exports.countries = function(req, res) {

	var a = req.body.countries;

	res.json({country:countries.numericToAlpha2(a)});
}
