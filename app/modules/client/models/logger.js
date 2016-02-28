//-------------------------------------------------------------------------------------- By: Syed Arshad
'use strict';
var mongoose = require('mongoose');
var Log = require('./clientLog.js');

//--------------------------------------------------------------------------------------
//log(role,userId,level,msg,type,status,IP); //This is the logger signature
function log(role, userId, level, msg, type, status, IP)
{
    var IP = IP.replace('::ffff:',''); //converting IPv6 address format to IPv4
    //localhost fix for uniformity
    if(IP == "::1")
    {
        IP = "127.0.0.1";
    }
            var log = new Log({role: role, userId: userId, date: new Date(), level: level, msg: msg, type: type, status: status, IP: IP});
            log.save(function (err) {
                if (err) {
                    return err;
                }
                else {
                    console.log("Client Log saved");
                }
            })

}
//--------------------------------------------------------------------------------------

exports.log = log;

//--------------------------------------------------------------------------------------
