'use strict';

MetronicApp.controller('TodoController', ['$rootScope', '$scope', '$http', '$cookies', '$cookieStore', 'settings', function ($rootScope, $scope, $http, $cookies, $cookieStore, settings) {
var adminValueFromCookie = $cookieStore.get('adminId');

        $scope.init = function () {

          // $scope.todo ={};
          $scope.dueTodoCount = 0;
          console.log("Init inside TodoController"+ adminValueFromCookie);
          $http.post('/admin/api/get-my-todos', {
              token: $cookies.token,
              adminId : adminValueFromCookie
          }).success(function (data) {
            $scope.todos = data.data;
          }).error(function (data) {
              console.log("Error in /admin/api/get-my-todos: " + data);
          });
        };



$scope.addTodo = function () {
  if($scope.newTodo){
var taskEntered = $scope.newTodo;
var adminId = adminValueFromCookie;


$http.post('/admin/api/insert-todo', {
    token: $cookies.token,
    todoText : taskEntered,
    adminId : adminId
}).success(function (data) {
    console.log(data);
    $scope.newTodo = "";//Reset the text field.
}).error(function (data) {
    console.log("Error in /admin/api/insert-todo: " + data);
});

// $http.post('/admin/api/delete-todo', {
//     token: $cookies.token,
//     adminId : adminId,
//     objID: '56164a40b205ed0009398a9e',
// }).success(function (data) {
//     console.log(data);
//   //  $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/delete-todo: " + data);
// });

// $http.post('/admin/api/insert-todo', {
//     token: $cookies.token,
//     todoText : taskEntered,
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//     $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/insert-todo: " + data);
// });

// $http.post('/admin/api/get-my-todos', {
//     token: $cookies.token,
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//   //  $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/get-my-todos: " + data);
// });

// $http.post('/admin/api/count-my-todos', {
//     token: $cookies.token,
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//   //  $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/count-my-todos: " + data);
// });


// $http.post('/admin/api/edit-todo', {
//     token: $cookies.token,
//     todoText : taskEntered,
//     objID: '56164a40b205ed0009398a9e',
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//     $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/insert-todo: " + data);
// });


// $http.post('/admin/api/mark-todo', {
//     token: $cookies.token,
//     isDone : false, //true or false
//     objID: '56164a40b205ed0009398a9e',
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//     $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/mark-todo: " + data);
// });


//get-my-todos-by-status


// $http.post('/admin/api/get-my-todos-by-status', {
//     token: $cookies.token,
//     status : true, //true or false
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//     // $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/get-my-todos-by-status: " + data);
// });

// $http.post('/admin/api/count-my-todos-by-status', {
//     token: $cookies.token,
//     status : false, //true or false
//     adminId : adminId
// }).success(function (data) {
//     console.log(data);
//     // $scope.newTodo = "";//Reset the text field.
// }).error(function (data) {
//     console.log("Error in /admin/api/count-my-todos-by-status: " + data);
// });

}
else {
  console.log("Enter text");
}
};

//not tested
$scope.deleteTodo = function (event) {
  var id = event.attributes;
  // var objID = id;
  console.log("ok"+id);
  // $http.post('/admin/api/delete-todo', {
  //     token: $cookies.token,
  //     adminId : adminId,
  //     objID: objID
  // }).success(function (data) {
  //     console.log(data);
  //   //  $scope.newTodo = "";//Reset the text field.
  // }).error(function (data) {
  //     console.log("Error in /admin/api/delete-todo: " + data);
  // });
};

$scope.markAsDoneTodo = function (id) {
  var objID = id;
  $http.post('/admin/api/mark-todo', {
      token: $cookies.token,
      isDone : true,
      objID: objID,
      adminId : adminId
  }).success(function (data) {
      console.log(data);
  }).error(function (data) {
      console.log("Error in /admin/api/mark-todo: " + data);
  });
};


$scope.markAsNotDoneTodo = function (id) {
  var objID = id;
  $http.post('/admin/api/mark-todo', {
      token: $cookies.token,
      isDone : false, //true or false
      objID: objID,
      adminId : adminId
  }).success(function (data) {
      console.log(data);
  }).error(function (data) {
      console.log("Error in /admin/api/mark-todo: " + data);
  });
};


$scope.editAndSaveTodo = function (id) {
  console.log("Edited save todo");
  // var objID = id;
  // $http.post('/admin/api/mark-todo', {
  //     token: $cookies.token,
  //     isDone : false, //true or false
  //     objID: objID,
  //     adminId : adminId
  // }).success(function (data) {
  //     console.log(data);
  // }).error(function (data) {
  //     console.log("Error in /admin/api/mark-todo: " + data);
  // });
};


$scope.showFn = function  (todo) {
if ($scope.show === "All") {
  return true;
}else if(todo.isDone && $scope.show === "Complete"){
  return true;
}else if(!todo.isDone && $scope.show === "Incomplete"){
  return true;
}else{
  return false;
}
};


//Pagination
$scope.currentPage = 1;
$scope.numPerPage = 4;
$scope.paginate = function(value) {
var begin, end, index;
begin = ($scope.currentPage - 1) * $scope.numPerPage;
end = begin + $scope.numPerPage;
index = $scope.allLogs.indexOf(value);
return (begin <= index && index < end);
};
//Pagination
  }]);
