app.factory('ProductService',['$http','BasePath', function($http, BasePath){
    return{
        getProduct: function(){
            return $http.get(BasePath + '/product')
        },
        getProductId: function(id){
            return $http.get(BasePath + '/product/' + id)
        }
    }
}]);