'use strict';
var express = require('express');
var inspect = require('util').inspect;
var store = require('../models/storeCollection.js');


exports.getStores = function (req, res) {
  store.find({}).sort({addedOn: 'desc'}).exec(function(err, docs) {
    if (err)
        return console.error(err);
    res.json({
        data: docs,
        code: 200
    });
   });
}


exports.insertStore = function (req, res) {
    var storeObj = req.body;
    var Data = new store({
      catId: storeObj.data.catId,
      storeName: storeObj.data.storeName,
      storeAddress: storeObj.data.storeAddress,
      storeType: storeObj.data.storeType,
    });
    Data.save(function (err, Data) {
        if (err)
            return console.error(err);
        res.json({
            code: 200
        })
    });
}

//edit is pending

exports.removeStore = function (req, res) {
  var objID = req.body.objID;

  store.remove({_id: objID}, function(err) {
       if (!err) {
              res.json({
                   msg: "Removed Store Successfully",
                   code: 200
               });
       }
       else {
              res.json({
                   msg: "Failed to remove Store",
                   code: 198
               });
       }
       });

}


exports.findnotes = function (req, res) {
    var adminId = req.body.adminId;

    notes.find({ adminId: adminId,  status: 1 }).sort({date: 'desc'}).exec(function(err, docs) {
      if (err)
          return console.error(err);
      res.json({
          data: docs,
          code: 200
      });
     });
}


exports.updatenotes = function (req, res) {
    var notesId = req.body.notesId;
    notes.update({notesId: notesId}, {$set: {status: 0}}, function () {
        res.send("Sucess");
    });
}


exports.getAdminInfo = function (req, res) {

    var data = req.body;
    var adminId = req.body.adminId;
//    var adminId = 11;
//    console.log("Hit getAdminInfo"+JSON.stringify(data));
    var data = [];
    c.query('select adminId,fname,lname,mobile,emailId,skypeId,fbId from admin where adminId = ' + adminId + '')
            .on('result', function (resrow) {
                resrow.on('row', function (row) {
                    data.push(row)
//                    console.log(row);
                }).on('error', function (err) {
                    console.log('Result error in getAdminInfo: ' + inspect(err));
                }).on('end', function (info) {
                    res.json({
                        Data: data,
                        code: 200
                    });
                    console.log('Result finished successfully');
                });
            })
}

exports.getAdminReplies = function (req, res) {

    var data = req.body;
    var adminId = req.body.adminId;
    var catId = req.body.catId;

    if(catId)
      var baseQuery = 'select * from predefinedreplies where adminID = ' + adminId + ' and categoryID = ' + catId + ' ';
    else
      var baseQuery = 'select * from predefinedreplies where adminID = ' + adminId + '';


    var data = [];
    c.query(baseQuery)
            .on('result', function (resrow) {
                resrow.on('row', function (row) {
                    data.push(row)
                }).on('error', function (err) {
                    console.log('Result error in getAdminReplies: ' + inspect(err));
                }).on('end', function (info) {
                    res.json({
                        Data: data,
                        code: 200
                    });
                    console.log('Result finished successfully');
                });
            })
}


//todo functions

exports.insertTodo = function (req, res) {
    var adminId = req.body.adminId;
    var taskName = req.body.todoText;

    var ToDo = new todos({
      adminId: adminId,
      taskName: taskName
    });

    ToDo.save(function (err, Data) {
        console.log(Data);
        if (err)
            return console.error(err);
        res.json({
            data: Data,
            code: 200
        })
         console.log("saved to database");
    });
}

exports.editTodo = function (req, res) {
    var adminId = req.body.adminId;
    var objID = req.body.objID;
    var taskName = req.body.todoText;

    todos.update({_id: objID}, {$set: {taskName: taskName, editedOn: new Date()}},  function () {
        res.send("Successfully edited");
    });
}


exports.deleteTodo = function (req, res) {
  var adminId = req.body.adminId;
  var objID = req.body.objID;

  todos.remove({_id: objID}, function(err) {
       if (!err) {
              res.json({
                   msg: "Removed To-Do Successfully",
                   code: 200
               });
       }
       else {
              res.json({
                   msg: "Failed to remove To-Do",
                   code: 198
               });
       }
       });
    // var notesId = req.body.notesId;
    // notes.update({notesId: notesId}, {$set: {status: 0}}, function () {
    //     res.send("Sucess");
    // });
}

exports.markTodo = function (req, res) {
    var adminId = req.body.adminId;
    var objID = req.body.objID;
    var isDone = req.body.isDone;

    if(isDone)
    {
      todos.update({_id: objID}, {$set: {isDone: isDone, completedOn: new Date()}},  function () {
          res.send("Sucess");
      });
    }else {
        todos.update({_id: objID}, {$set: {isDone: isDone, completedOn: ''}},  function () {
            res.send("Sucess");
        });
    }




}

exports.getMyTodos = function (req, res) {
    var adminId = req.body.adminId;

    todos.find({ adminId: adminId }).sort({addedOn: 'desc'}).exec(function(err, docs) {
      if (err)
          return console.error(err);
      res.json({
          data: docs,
          code: 200
      });

     });

}

exports.countMyTodos = function (req, res) {
    var adminId = req.body.adminId;

    todos.find({
        adminId: adminId
    }, function (err, data) {

        if (err)
            return console.error(err);

        res.json({
            count: data.length,
            code: 200

        });
    });
}

//based on todo Status

exports.getMyTodosByStatus = function (req, res) {
    var adminId = req.body.adminId;
    var status = req.body.status;

    todos.find({
        adminId: adminId,
        isDone:status
    }, function (err, data) {

        if (err)
            return console.error(err);

        res.json({
            data: data,
            code: 200

        });
    });
}

exports.countMyTodosByStatus = function (req, res) {
    var adminId = req.body.adminId;
    var status = req.body.status;
    todos.find({
        adminId: adminId,
        isDone:status
    }, function (err, data) {

        if (err)
            return console.error(err);

        res.json({
            count: data.length,
            code: 200

        });
    });
}
