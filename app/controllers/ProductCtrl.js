app.controller('ProductCtrl', function($scope, $http, ProductService){
    ProductService.getProduct().then(function(result){
        $scope.items = result.data.response
    }).catch(function(err){
        $scope.items  = [];
    })
})