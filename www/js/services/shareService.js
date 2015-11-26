/**
 * Created by liming on 2015-11-04
 * 分享相关
 */
angular.module('havefun.services')
    .factory('shareService',
    ['$q','$http','$log',
    function($q,$http,$log){
//        var shareService = function() {};
//        shareService.prototype.weixin.checkInstalled = function(callback) {
//            Wechat.isInstalled(function (installed) {
//                callback(installed);
//            }, function (reason) {
//                $log.error(reason);
//                callback(false);
//            });
//        };
//
//        shareService.prototype.weixin.shareToTimeLine = function(media,callback) {
//            this.checkInstalled(function(installed) {
//                if(!installed) return;
//                Wechat.share(media, function () {
//                    callback && callback(true);
//                }, function (reason) {
//                    callback && callback(false,reason);
//                });
//            })
//        };
//
//        return shareService;

        return {
            weixin: {
                //检测是否安装
                checkInstalled: function(callback) {
                    Wechat.isInstalled(function (installed) {
                        callback(installed);
                    }, function (reason) {
                        $log.error(reason);
                        callback(false);
                    });
                },

                //分享文字到朋友圈
                shareTextToTimeline:function(text) {
                    this.checkInstalled(function(installed) {
                        if(!installed) return;
                        Wechat.share({
                            text: text,
                            scene: Wechat.Scene.SESSION   // share to Timeline
                        }, function () {
                            callback && callback(true);
                        }, function (reason) {
                            callback && callback(false,reason);
                        });
                    })
                },

                //分享媒体文件到朋友圈
                /**
                 * @param media
                 * demo:
                 *
                 *  var media= {
                        message: {
                            title: "测试分享标题",
                            description: "测试分享内容",  //描述好像没用
                            thumb: "https://effevo.com/public/img/logo/logo_bai.png",
                            media: {
                                type: Wechat.Type.WEBPAGE,   // webpage
                                webpageUrl: "https://effevo.com"    // webpage
                            }
                        },
                        scene: Wechat.Scene.TIMELINE   // share to Timeline
                    };

                 * @param callback
                 */

                //分享链接到朋友圈
                shareToTimeLine: function(media,callback) {
                    this.checkInstalled(function(installed) {
                        if(!installed) return;
                        Wechat.share(media, function () {
                            callback && callback(true);
                        }, function (reason) {
                            callback && callback(false,reason);
                        });
                    });
                }
            }
        }
    }]);