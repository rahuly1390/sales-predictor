MetronicApp.controller('AddProductController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("AddProductController loaded");

  $scope.init = function() {

    // $scope.sortType = 'created';
    // $http.get('/admin/api/get-all-stores/?token=' + $cookies.token).
    // success(function(data) {
    //   $scope.allStores = data.data;
    //   console.log(data.data);
    // }).
    // error(function(data, status, headers, config) {});

  }

  $scope.submit = function() {

    console.log( $scope.session);

    var product = {
      productName: $scope.session.pName,
      productPrice: $scope.session.pPrice,
      productDescription: $scope.session.pDescription
    };

  console.log(product);
    $http.post('/admin/api/add-product', {
      data: product,
      token: $cookies.token
    }).
    success(function(data) {
      $scope.session = {};
      productSuccess();
      console.log(data);
    }).
    error(function(data, status, headers, config) {});
  }

}]);



//edit store controller

MetronicApp.controller('EditProductController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("EditProductController loaded");

  $scope.init = function() {
    $scope.sortType = 'created';
    $http.get('/admin/api/get-all-products-now/?token=' + $cookies.token).
    success(function(data) {
      $scope.allProducts = data.data;
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



MetronicApp.controller('RemoveProductController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
  console.log("RemoveProductController loaded");

  $scope.init = function() {
    $scope.sortType = 'created';
    $http.get('/admin/api/get-all-products-now/?token=' + $cookies.token).
    success(function(data) {
      $scope.allProducts = data.data;
      console.log(data.data);
    }).
    error(function(data, status, headers, config) {});
  }

  $scope.removeProduct = function(product) {
    $http.post('/admin/api/remove-product', {
      objID: product._id,
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
