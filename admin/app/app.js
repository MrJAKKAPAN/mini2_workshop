var app = angular.module('app', ['ui.router', 'angular-loading-bar', 'ui-notification', 'angularFileUpload','uiSwitch']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider', 'NotificationProvider',
    function ($stateProvider,$urlRouterProvider,$locationProvider, NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
    });

    $urlRouterProvider.otherwise('/');  
    $stateProvider
        .state('dashboard',{
           url: '/',
           templateUrl: 'app/views/dashboard/index.html',
           controller: 'dashboardCtrl',
           data : {
            authenticated : true
           }
        })
        .state('inventory',{
            url: '/inventory',
            templateUrl: 'app/views/inventory/index.html',
            controller: 'inventoryCtrl',
            data : {
              authenticated : true
            }
        })
        .state('inventory-create',{
          url: '/inventory/create',
          templateUrl: 'app/views/inventory/create.html',
          controller: 'inventoryCreateCtrl',
          data : {
            authenticated : true
          }
        })
        .state('inventory-edit',{
          url: '/inventory/:id/edit',
          templateUrl: 'app/views/inventory/edit.html',
          controller: 'inventoryEditCtrl',
          data : {
            authenticated : true
          }
        })
        .state('login',{
            url : '/login',
            templateUrl : 'app/views/login/index.html',
            controller: 'AuthCtrl'
        })
        .state('500',{
          url : '/500',
          templateUrl : 'app/views/includes/500.html',
          data : {
            authenticated : true
          }
        })
        
}])

app.constant('Basepath', 'http://localhost:8000/api/admin/')
app.constant('ImgBasepath', 'http://localhost/mini2_workshop/assets/images/uploads/source/')

// app.constant('Basepath', 'https://s-courses.com/minicourse2/service/api/admin/')
// app.constant('ImgBasepath', 'https://s-courses.com/minicourse2/assets/images/uploads/source/')


app.run(['$rootScope', '$transitions', '$http', '$location', '$timeout',
  function ($rootScope, $transitions, $http, $location, $timeout) {
    $rootScope.checkActive = function(state) {
      var path = $location.path();  
      return path.includes(state)
    }
    
    // // keep user logged in after page refresh
    $rootScope.currentUser = JSON.parse(sessionStorage.getItem('credentials')) || false;
    
    $transitions.onStart({
      to: function (state) { 
        return state.data != null && state.data.authenticated === true;
      }
    }, function (trans) {
      var $state = trans.router.stateService
      var Auth = trans.injector().get('AuthService')
      var isAuthenticated = Auth.getToken() || false
      if (!isAuthenticated || !$rootScope.currentUser) {
        return $state.target('login');
      }

      $rootScope.getLayout = function(page){ 
        return isAuthenticated ? `app/views/includes/${page}.html` : false
      }

    });
}]);

app.filter('reverseImage', function() {
  return function(input, uppercase) {
    var checkHttp = input.split(':')[0]
    if (checkHttp === 'https' || checkHttp === 'http' ) {
      return input
    } else {
      return "../assets/images/uploads/source/" + input
    }
  };
})

app.directive('ngThumb', ['$window', function($window) {
  var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
          return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
          var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
  };

  return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
          if (!helper.support) return;
          var params = scope.$eval(attributes.ngThumb);

          if (!helper.isFile(params.file)) return;
          if (!helper.isImage(params.file)) return;

          var reader = new FileReader();
          reader.onload = function (event) {
              element.attr('src', event.target.result);
          }
          reader.readAsDataURL(params.file);

      }
  };
}]);



