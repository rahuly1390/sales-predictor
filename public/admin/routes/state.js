// LOGIN
    .state('login', {
    url: "/login.html",
    templateUrl: "views/login.html",
    data: {
        pageTitle: 'Login'
    },
    controller: "AuthenticationController",
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
                name: 'MetronicApp',
                files: [
                    'controllers/AuthenticationController.js'
                ]
            }]);
        }]
    }
})

// Dashboard
.state('dashboard', {
    url: "/dashboard.html",
    templateUrl: "views/dashboard/dashboard.html",
    data: {
        pageTitle: 'Dashboard',
        pageSubTitle: 'Admin dashboard'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'assets/js/moment.min.js',
                    'controllers/DashboardController.js'
                ]
            });
        }]
    }
})

.state('storeadd', {
    url: "/add-store.html",
    templateUrl: "views/stores/add-store.html",
    data: {
        pageTitle: 'Store',
        pageSubTitle: 'Add a new store'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/StoreController.js'
                ]
            });
        }]
    }
})

.state('storeedit', {
    url: "/edit-store.html",
    templateUrl: "views/stores/edit-store.html",
    data: {
        pageTitle: 'Store',
        pageSubTitle: 'Edit store'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/StoreController.js'
                ]
            });
        }]
    }
})

.state('storeremove', {
    url: "/remove-store.html",
    templateUrl: "views/stores/remove-store.html",
    data: {
        pageTitle: 'Store',
        pageSubTitle: 'Remove store'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/StoreController.js'
                ]
            });
        }]
    }
})

//products
.state('productadd', {
    url: "/add-product.html",
    templateUrl: "views/products/add-product.html",
    data: {
        pageTitle: 'Product',
        pageSubTitle: 'Add a product'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/ProductController.js'
                ]
            });
        }]
    }
})

.state('productedit', {
    url: "/edit-product.html",
    templateUrl: "views/products/edit-product.html",
    data: {
        pageTitle: 'Product',
        pageSubTitle: 'Edit product'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/ProductController.js'
                ]
            });
        }]
    }
})

.state('productremove', {
    url: "/remove-product.html",
    templateUrl: "views/products/remove-product.html",
    data: {
        pageTitle: 'Product',
        pageSubTitle: 'Remove product'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/ProductController.js'
                ]
            });
        }]
    }
})

.state('storeoperations', {
    url: "/store-operations.html",
    templateUrl: "views/operations/store-operations.html",
    data: {
        pageTitle: 'Operations',
        pageSubTitle: 'Store Operations'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/OperationController.js'
                ]
            });
        }]
    }
})

.state('storetransactions', {
    url: "/store-transactions.html",
    templateUrl: "views/operations/store-transactions.html",
    data: {
        pageTitle: 'Operations',
        pageSubTitle: 'Store Transactions'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/OperationController.js'
                ]
            });
        }]
    }
})

.state('transactiongenerator', {
    url: "/transaction-generator.html",
    templateUrl: "views/operations/transaction-generator.html",
    data: {
        pageTitle: 'Operations',
        pageSubTitle: 'Transactions Generator'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/OperationController.js'
                ]
            });
        }]
    }
})

.state('viewtransactions', {
    url: "/view-transactions.html",
    templateUrl: "views/operations/view-transactions.html",
    data: {
        pageTitle: 'Operations',
        pageSubTitle: 'View Transactions'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/OperationController.js'
                ]
            });
        }]
    }
})

.state('runanalysis', {
    url: "/run-analysis.html",
    templateUrl: "views/analysis/run-analysis.html",
    data: {
        pageTitle: 'Predictive',
        pageSubTitle: 'Analysis'
    },
    resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'MetronicApp',
                insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                files: [
                    'controllers/AnalysisController.js'
                ]
            });
        }]
    }
})
