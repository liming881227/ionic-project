/**
 * Created by dushufang on 2015/11/8.
 */
/**
 * Created by dushufang on 2015/9/16.
 */
angular.module('havefun.services')

    .factory('utilService',
    ['$ionicActionSheet','$cordovaCamera','$ionicLoading','$ionicPopup','$cordovaCapture',
    function($ionicActionSheet,$cordovaCamera,$ionicLoading,$ionicPopup,$cordovaCapture){

        var service = {
            //loading
            showLoading : function(str){
                $ionicLoading.show({
                    template : str,
                    noBackdrop : true,
                    duration : 1000
                });
            },

            //confirm提示
            showPopup : function(){
                var confirmPopup = $ionicPopup.confirm({
                    title: '退出此次编辑？',
                    cancelText : '取消',
                    okText : '退出'
//                template: ''
                });
                return confirmPopup;
            },

            //获取视频的方式
            getVideoMethod : function(callback){
                $ionicActionSheet.show({
                    buttons: [
                        { text: '拍摄' },
                        { text: '本地选取' }
                    ],
                    cancelText: '取消',
                    cancel: function() {

                    },
                    buttonClicked: function(index) {
                        callback(index);
                        return true;
                    }
                });
            },

            //打开相机
            openCamera : function(option,callback){
                var options = {
                    //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
//                    quality: 100,                                            //相片质量0-100
                    //手机相册无法识别
                    destinationType:  Camera.DestinationType.NATIVE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
//                    allowEdit: true,                                        //在选择之前允许修改截图
//                    encodingType:Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
//                targetWidth: 200,                                        //照片宽度
//                targetHeight: 200,                                       //照片高度
                    mediaType: option.mediaType || 2,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                    cameraDirection:0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true                                   //保存进手机相册
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    callback(null,imageData);
                }, function(err) {
                    callback(err);
                });
            },

            //录制视频
            captureVideo : function(options,callback){
                $cordovaCapture.captureVideo(options).then(function(videoData) {
                    callback(null,videoData);
                }, function(err) {
                    callback({msg:'error'});
                });
            }
        };

        return service;
    }]);