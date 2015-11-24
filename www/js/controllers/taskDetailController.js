angular.module('havefun.controllers')
    .controller('taskDetailController', function($scope, $stateParams,$log,$cordovaFileTransfer,$ionicPopup,queryService,utilService,modalService) {
        window.scope = $scope;
        $scope.taskId = $stateParams.taskId;
        queryService.task.getByTaskId($scope.taskId,function(err,data) {
            if(data) {
                $scope.task = data;
                console.log(data);
            }
        });

        $scope.uploadVideo = function(){
            utilService.getVideoMethod(function(data){
                //上传到服务器
                var _upload = function(videoData) {
                    var params = {
                        taskId: $scope.taskId,
                        userId: 55
                    };

                    if(videoData) {
                        queryService.util.uploadFile(videoData,"video/mp4",params).then(function(data) {
                            if(data) {
                                utilService.showLoading('上传成功,待管理员审核!',5000);
                            }else {
                                utilService.showLoading('上传成功,待管理员审核!',5000);
                            }
                        }).catch(function(err) {
                            $ionicPopup.alert('上传失败!');
                        });
                    }
                };

                if(data){
                    //本地选取
                    var option = { mediaType : 1 };
                    utilService.openCamera(option,function(err,videoData){
                        _upload(videoData);
                    });
                }else{  //拍摄
                    var option = {limit: 1};
                    utilService.captureVideo(option,function(err,videoData){
                        _upload(videoData[0].fullPath);
                    });
                }
            });
        }


        $scope.shareVideo = function(video) {
            $scope.curVideo = video;
            modalService.show('templates/share.html','shareController', {video: video}).then(function(result) {
                console.log(result);
            });
        };
    });
