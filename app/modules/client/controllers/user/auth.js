'use strict';
var express = require('express');

/**
 * connection to maria database
 */
var connect = require('../../../../models/maria.js');
var Logger = require('../../models/logger.js'); //client logger
var c = new connect.maria();



exports.ackverify = function(req, res) {
	var data = [];
	c.query('select ackcode from client where ackcode="' + req.body.ackcode + '"')
		.on('result', function(resrow) {

			resrow.on('row', function(row) {
					data.push(row)
				})
				.on('error', function(err) {
					console.log('Result error: ' + err);
				})
				.on('end', function(info) {
					if (data.length != 0) {
						var q = 'UPDATE client SET emailverified=1,ackcode=null where ackcode="' + req.body.ackcode + '"';
						c.query(q)
							.on('result', function(result) {
								result.on('end', function(info) {
									console.log(info);
									res.json({
										"status": 200
									});
								})
							})

					} else {
						res.json({
							"status": 198
						});
					}

				});

		})
}
