MetronicApp.controller('StoreProductController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("StoreProductController loaded");

  $scope.init = function() {


  }

  $scope.submit = function() {

    // var store = {
    //   catId: $scope.session.storeCat,
    //   storeName: $scope.session.sName,
    //   storeAddress: $scope.session.sAddress,
    //   storeType: $scope.session.storeTyp
    // };
    //
    //
    // $http.post('/admin/api/add-store', {
    //   data: store,
    //   token: $cookies.token
    // }).
    // success(function(data) {
    //   $scope.session = {};
    //   storeSuccess();
    //   console.log(data);
    // }).
    // error(function(data, status, headers, config) {});
  }

}]);



//edit store controller

MetronicApp.controller('EditStoreController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("EditStoreController loaded");

  $scope.init = function() {
    $scope.sortType = 'created';
    $http.get('/admin/api/get-all-stores/?token=' + $cookies.token).
    success(function(data) {
      $scope.allStores = data.data;
      console.log(data.data);
    }).
    error(function(data, status, headers, config) {});
  }

  $scope.editThis = function(store) {
    console.log("Editing this store now");
    console.log(JSON.stringify(store));
    console.log(store._id);
  }
}]);



MetronicApp.controller('RemoveStoreController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("RemoveStoreController loaded");

  $scope.init = function() {
    $scope.sortType = 'created';
    $http.get('/admin/api/get-all-stores/?token=' + $cookies.token).
    success(function(data) {
      $scope.allStores = data.data;
    }).
    error(function(data, status, headers, config) {});
  }

  $scope.removeStore = function(store) {
    $http.post('/admin/api/remove-store', {
      objID: store._id,
      token: $cookies.token
    }).
    success(function(data) {
      $scope.init();
    }).
    error(function(data, status, headers, config) {});
  }
}]);

//upto here


//indi controllers for each actions
MetronicApp.controller('storeCatController', ['$rootScope', '$scope', '$http', '$cookies', 'settings', '$location', function($rootScope, $scope, $http, $cookies, settings, $location) {
  console.log("storeCatController loaded");
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
  }

}]);
