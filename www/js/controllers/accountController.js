angular.module('havefun.controllers')
.controller('accountController', ['$scope','$ionicModal','queryService','modalService',function($scope,$ionicModal,queryService,modalService) {
        window.scope = $scope;
        queryService.account.getAccount(function(data){
            $scope.curAccount = data;
            $scope.accountVideos = [];
        });

        $scope.refreshVideos = function(type) {
            queryService.account.queryVideo(type,function(err,data){
                Array.prototype.splice.apply($scope.accountVideos,[0,$scope.accountVideos.length].concat(data));
                console.log($scope.accountVideos);
                $scope.curAccountVideoModal.show();
            });
        };

        // 查看相关视频信息modal页面
        $ionicModal.fromTemplateUrl('templates/account-video.html', {
            animation: 'slide-in-up',
            scope: $scope,
            backdropClickToClose : false
        }).then(function(modal) {
            $scope.curAccountVideoModal = modal;
        });

        //我上传的视频
        $scope.queryVideo = function(type){
            $scope.curType = type ? '上传' : '分享';
            $scope.refreshVideos(type);
        };

        //我分享的视频
        $scope.quitQueryVideo = function(){
            $scope.curAccountVideoModal.hide();
        };

        //取出
        $scope.showCurAccountVantage = function(){
            modalService.show('templates/accountVantage.html','accountController');
        }
}]);
