app.controller('ProductDetailCtrl', function($scope, $sce, ProductService, $stateParams, $state){
    var productId = $stateParams.id

    ProductService.getProductId(productId).then(function(result){
        $scope.product = result.data.response
        var detail = $scope.product.detail
        $scope.product.detail = detail == null ? null: detail.replace("../", "");
    }).catch(function(err){
        $state.go('product')
    })

    $scope.encodedData = function(encoded){
        return $sce.trustAsHtml(encoded);
    }
})