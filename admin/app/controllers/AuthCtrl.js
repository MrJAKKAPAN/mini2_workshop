app.controller('AuthCtrl',['$scope','$rootScope','$location','$state', 'AuthService', 'Notification', 
function ($scope,$rootScope, $location, $state, AuthService, Notification){
    $rootScope.title = 'Admin | Login';

    $scope.credentials = { username:'', password:'' };
    AuthService.ClearCredentials()

    $scope.loginSubmit = function(){
        AuthService.Login($scope.credentials).then(function(resp) {
            AuthService.SetCredentials(resp.data);
            Notification.success('Login Successful!');
            $state.go('dashboard')
        }).catch(function(err, ddd, aaa) {
            AuthService.Unauthorized(err)
        });
    }

    $rootScope.getLayout = function(){
        return false
    }
  
  }]);