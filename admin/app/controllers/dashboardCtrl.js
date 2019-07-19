app.controller('dashboardCtrl',['$scope','$rootScope','$http', 'InventoryService',
    function ($scope,$rootScope,$http, InventoryService){
    $scope.message = 'Dashboard Controller'

    // InventoryService.getProduct().then(function(resp){
    //     console.log(resp)
    // })


}])