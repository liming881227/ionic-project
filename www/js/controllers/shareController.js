angular.module('havefun.controllers').controller('shareController',shareController);

shareController.$inject = ['$scope','$log','$ionicPopup','shareService','queryService','modalService','parameters'];
function shareController($scope,$log, $ionicPopup,shareService,queryService,modalService,parameters) {
    $scope.allShareItems = [
        {type:'timeline',name:'朋友圈'},
        {type:'weixin',name:'微信好友'},
        {type:'kongjian',name:'QQ空间'},
        {type:'qq',name:'QQ'},
        {type:'renren',name:'人人'},
        {type:'xinlang',name:'新浪'}
    ];

    $scope.curVideo = parameters.video;

    $scope.shareVideo = function(item) {
        var media= {
            message: {
                title: $scope.curVideo.name,
                description: $scope.curVideo.description,  //描述好像没用
                thumb: "https://effevo.com/app/index/img/icon.png",  //必须是外网可访问到的路径
                media: {
                    type: Wechat.Type.WEBPAGE,   // webpage
//                    webpageUrl: "http://stackoverflow.com/questions/14390265/jquery-cancel-button-input-placeholder-text"    // todo
                    webpageUrl: "http://public.dev.effevo.com/#/share?videoId=" + $scope.curVideo.videoId    // todo
//                    webpageUrl: "http://10.129.193.43:8100/#/share?videoId=" + curVideo.videoId    // todo
                }
            },
            scene: Wechat.Scene.TIMELINE   // share to Timeline
        };

        shareService.weixin.shareToTimeLine(media,function(success) {
            var alertPopup = $ionicPopup.alert({
                title: '分享',
                template: success ? '分享成功!' : '取消分享!'
            });
            alertPopup.then(function(res) {
                modalService.hide();
            });

            if(success) {
                queryService.account.addUserShare(1,$scope.curVideo.videoId);
            }
        });
    }
}
