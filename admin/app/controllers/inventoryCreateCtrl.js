app.controller('inventoryCreateCtrl',['$scope','InventoryService', 'AuthService','Notification', '$state', 'FileUploader', 'ImgBasepath','$stateParams',
function ($scope, InventoryService, AuthService, Notification, $state, FileUploader, ImgBasepath, $stateParams){
    $scope.message = 'inventory'
    $scope.ImgBasepath = ImgBasepath;
    $scope.product = {};
    CKEDITOR.replace( 'editor' ,{
        filebrowserBrowseUrl : 'plugins/responsive_filemanager/filemanager/dialog.php?type=2&editor=ckeditor&fldr=',
        filebrowserUploadUrl : 'plugins/responsive_filemanager/filemanager/dialog.php?type=2&editor=ckeditor&fldr=',
        filebrowserImageBrowseUrl : 'plugins/responsive_filemanager/filemanager/dialog.php?type=1&editor=ckeditor&fldr='
    });

    $scope.createProduct = function(data){
        var getData = CKEDITOR.instances.editor.getData();
        var request = $.extend(data, {'detail': getData, 'status': 1 })
        if (typeof request.image !== 'undefined') {
            InventoryService.createProduct(request).then(function(resp){
                Notification.success(resp.data.message);
                $state.go('inventory')
            }).catch(function(err) {
                AuthService.Unauthorized(err)
            });
        }else {
            Notification.warning('Please Uploade image');
        }
    }

    $scope.progress_start = false;
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php',
        queueLimit  : 1,
    });
  
    // FILTERS
  
    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1 ;
        }
    });
  
    // CALLBACKS
  
    uploader.onWhenAddingFileFailed = function(item, filter, options) {
        $scope.progress_start = false;

    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        $scope.progress_start = true;
        $scope.completeAll = true;
    };
    uploader.onBeforeUploadItem = function(item) {
        $scope.complete = true;
    }    
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.product.image = response.file_name
                $scope.complete = false;
                $scope.completeAll = true;
            });
        }, 1000);
        uploader.removeAfterUpload
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        setTimeout(function () {
            $scope.$apply(function () {
                $scope.complete = false;
                $scope.completeAll = false;
                Notification.error('Permission Denied!');
            });
        }, 1000);
    };

    uploader.clearQueue  = function(fileItem, response, status, headers) {
        $scope.progress_start = false;
        while (this.queue.length) {
            this.queue[0].remove();
        }
        $scope.completeALl = false;
        $scope.product.image = ''
    };
  


    
}])