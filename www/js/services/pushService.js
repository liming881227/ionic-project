/**
 * Created by liming on 2015-11-04
 * 推送相关服务
 */
angular.module('havefun.services')
.factory('pushService',
    ['$q','$http','$log','$window',
    function($q,$http,$log,$window){
        var jpushServiceFactory={},push;
        //启动极光推送
        var _init=function(config){
            push = window.plugins && window.plugins.jPushPlugin;
            if(push) {
                window.plugins.jPushPlugin.init();
                //设置tag和Alias触发事件处理
                document.addEventListener('jpush.setTagsWithAlias',config.stac,false);
                //打开推送消息事件处理
                //oniac 为事件回调
                window.plugins.jPushPlugin.openNotificationInAndroidCallback = config.oniac;
                window.plugins.jPushPlugin.setDebugMode(false);

                var onGetRegistradionID = function(data) {
                    try{
                        if(data) {
                            //todo save to db(userId reegisterationId)
                        }
    //                    alert("JPushPlugin:registrationID is"+data);
                    }catch(exception){
                    }
                };
                window.plugins.jPushPlugin.getRegistrationID(onGetRegistradionID);
            }
        };
        //获取状态
        var _isPushStopped=function(fun){
            $window.plugins.jPushPlugin.isPushStopped(fun)
        };

        //停止极光推送
        var _stopPush=function(){
            $window.plugins.jPushPlugin.stopPush();
        };

        //重启极光推送
        var _resumePush=function(){
            $window.plugins.jPushPlugin.resumePush();
        };

        //设置标签和别名
        var _setTagsWithAlias=function(tags,alias){
            $window.plugins.jPushPlugin.setTagsWithAlias(tags,alias);
        };

        //设置标签
        var _setTags=function(tags){
            $window.plugins.jPushPlugin.setTags(tags);
        };

        //设置别名
        var _setAlias=function(alias){
            $window.plugins.jPushPlugin.setAlias(alias);
        };

        jpushServiceFactory.init=_init;
        jpushServiceFactory.isPushStopped=_isPushStopped;
        jpushServiceFactory.stopPush=_stopPush;
        jpushServiceFactory.resumePush=_resumePush;
        jpushServiceFactory.setTagsWithAlias=_setTagsWithAlias;
        jpushServiceFactory.setTags=_setTags;
        jpushServiceFactory.setAlias=_setAlias;

        return jpushServiceFactory;
}]);