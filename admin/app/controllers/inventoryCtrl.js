app.controller('inventoryCtrl',['$scope','InventoryService', 'AuthService','Notification', '$state', 'FileUploader', 'ImgBasepath','$stateParams', 'PaginateService',
function ($scope, InventoryService, AuthService, Notification, $state, FileUploader, ImgBasepath, $stateParams, PaginateService){
    $scope.message = 'inventory'
    $scope.ImgBasepath = ImgBasepath;
    InventoryService.getProduct().then(function(resp){
        $scope.products = _.reverse(resp.data.response)
        $scope.pager = {};
        $scope.setPage = function (page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }
            // get pager object from service
            $scope.pager = PaginateService.GetPaginate($scope.products.length, page, 5);

            // get current page of items
            $scope.items = $scope.products.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }
        $scope.setPage(1);
    }).catch(function(err) {
        console.log(err)
        AuthService.Unauthorized(err)
    });

    

    $scope.activeProduct = function (status, id) {
        var active = status ? 1 : 0
        InventoryService.ActiveProduct(active, id).then(function() {
            Notification.success('Active Successful!');
        }).catch(function(err) {
            AuthService.Unauthorized(err)
        });
    }

    $scope.deleteProduct = function (data) {
        swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                InventoryService.DeleteProduct(data.id).then(function(resp){
                    swal("Your record has been deleted.", {icon: "success",});          
                    $state.reload();
                }).catch((err) => {
                    swal('Deleted Record Error!', {icon: "error", }); 
                })
            }
        });
    }

}])