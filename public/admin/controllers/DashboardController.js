MetronicApp.controller('DashboardController', ['$rootScope', '$scope', '$http', '$cookies', '$cookieStore', 'settings', function ($rootScope, $scope, $http, $cookies, $cookieStore, settings) {
console.log("DashboardController loaded");


$scope.init = function() {
  $scope.storeCategory = [{
    "id": 1,
    "name": "Electronics"
  }, {
    "id": 2,
    "name": "Men"
  }, {
    "id": 3,
    "name": "Women"
  }, {
    "id": 4,
    "name": "Baby & Kids"
  }, {
    "id": 5,
    "name": "Home & Furniture"
  }, {
    "id": 6,
    "name": "Books & Media"
  }, {
    "id": 7,
    "name": "Auto & Sports"
  }, {
    "id": 8,
    "name": "Super Mart"
  }];


  $http.get('/admin/api/get-all-stores/?token=' + $cookies.token).
  success(function(data) {
    $scope.allStores = data.data;
    // console.log(data.data);
  }).
  error(function(data, status, headers, config) {});

  $http.get('/admin/api/get-all-products-now/?token=' + $cookies.token).
  success(function(data) {
    $scope.allProducts = data.data;
    // console.log(data.data);
  }).
  error(function(data, status, headers, config) {});

}

    }]);
