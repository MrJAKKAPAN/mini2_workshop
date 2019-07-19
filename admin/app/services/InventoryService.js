app.factory('InventoryService', ['$http', 'Basepath','$rootScope','AuthService',
function ($http, Basepath, $rootScope, AuthService) {
    return {
        createProduct: function(data) {
            return $http({
				url: Basepath + 'product',
				method: "POST",
				data: $.param(data),
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + AuthService.getToken()
				}
			});
		},

		updateProduct: function(data) {
            return $http({
				url: Basepath + 'product/' + data.id,
				method: "PUT",
				data: $.param(data),
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + AuthService.getToken()
				}
			});
		},

		getProduct: function(data) {
            return $http.get(Basepath + 'product')
		},
		
		getProductEdit: function(id) {
            return $http.get(Basepath + 'product/' + id + '/edit',{
				headers:{
					'Authorization': 'Bearer ' + AuthService.getToken()
				}
			})
		},

		DeleteProduct: function(id){
            return $http({
                url: Basepath + 'product/' + id ,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + AuthService.getToken()
                }
            })
		},

		ActiveProduct: function(data, id){
            return $http({
                url: Basepath + 'product/active/' + id ,
				method: "POST",
				data: $.param({'status': data}),
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Bearer ' + AuthService.getToken()
				}
            })
		}
		
    };
}]);