app.factory('AuthService', ['$http', 'Basepath','$rootScope','Notification','$state',
function ($http, Basepath, $rootScope, Notification, $state) {
    return {
        Login: function(credentials) {
            return $http({
				url: Basepath + 'auth/login',
				method: "POST",
				data: $.param(credentials),
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
        },
        
		SetCredentials: function (credentials) { 
            $rootScope.currentUser = credentials.response;
            localStorage.setItem('token', credentials.token)
            sessionStorage.setItem('credentials', JSON.stringify($rootScope.currentUser))
        },
        
		ClearCredentials: function () {
            $rootScope.currentUser = {};
            const token = this.getToken()
            if(token){
                $http.get(Basepath + 'auth/logout',{
                    headers: { 'Authorization': 'Bearer ' + token }
                }).catch(function(err){
                    console.log(err)
                })
            }
            localStorage.removeItem('token')
            sessionStorage.removeItem('credentials')
            $state.go('login')
        },
        
        getToken: function (){
            return localStorage.getItem('token')
        },

        Unauthorized: function (err){
            if(err.status == 401){
                Notification.error(err.statusText);
                localStorage.removeItem('token')
                this.ClearCredentials()
            } else if(err.status == 400){
                Notification.error(err.statusText);
            }else{
                Notification.error('Error! Connection Refused.')
                // $state.go('500')
            }
        }
    };
}]);