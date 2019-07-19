var app = angular.module('app',['ui.router','ngSanitize'])
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/product')
    $stateProvider
        .state('product',{
            url: '/product',
            templateUrl: 'app/views/product/index.html',
            controller: 'ProductCtrl'
        })
        .state('product-detail',{
            url: '/product/:id',
            templateUrl: 'app/views/product/detail.html',
            controller: 'ProductDetailCtrl'
        })
})

// app.constant('BasePath', 'https://s-courses.com/minicourse2/service/api')
app.constant('BasePath', 'http://localhost:8000/api')

app.filter('reverseImage', function() {
    return function(input, uppercase) {
      var checkHttp = input.split(':')[0]
      if (checkHttp === 'https' || checkHttp === 'http' ) {
        return input
      } else {
        return "assets/images/uploads/source/" + input
      }
    };
})
app.controller('ProductDetailCtrl', function($scope, $http, $stateParams){
    console.log('ProductDetailCtrl', $stateParams.id)
})


