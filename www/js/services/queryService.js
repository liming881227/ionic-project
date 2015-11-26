/**
 * Created by liming on 2015-11-04
 * 后台请求
 */
angular.module('havefun.services')
    .factory('queryService',
    ['$q','$http',
    function($q,$http){
        var serverAddr = 'http://hm.sogouqa.com/api';
//        var serverAddr = 'http://test.sogouqa.com/api';
        function _myHttpGet (url, callback) {
            $http.get(serverAddr + url).success(function (data, status, headers, config) {
                if (callback)
                    callback(null,data);
            }).error(function (err, status, header, config) {
                if (callback)
                    callback(err);
            });
        }

        function _myHttpPost (url, postData, callback) {
            $http.post(serverAddr + url, postData).success(function (data, status, headers, config) {
                if (callback)
                    callback(null,data);
            }).error(function (err, status, header, config) {
                if(err) {
                    console.log(err);
                }
                if (callback)
                    callback(err);
            });
        }

        function _parseGetParams(query) {
            var paramsArr = [];
            for(var key in query) {
                if(query.hasOwnProperty(key)){
                    paramsArr.push(key + '=' + query[key]);
                }
            }
            return paramsArr.join('&');
        }

        return {
            util: {
                /**
                 * 上传文件
                 * @param filePath 文件本地路径
                 * @param mimeType 文件类型
                 * @params 其它参数
                 * @param callback
                 */
                uploadFile : function(filePath,mimeType,params) {
                    var defered = $q.defer(),
                        serverFilePath = 'http://hm.sogouqa.com/api/upload',
                        ft = new FileTransfer(),
                        options = new FileUploadOptions();

                    var win = function(r) {
                        cordova.plugin.pDialog.dismiss();
                        defered.resolve(r);
                    };
                    var fail = function(error) {
                        cordova.plugin.pDialog.dismiss();
                        defered.reject(error);
                    };

                    options.fileKey  = "file";
                    options.fileName = filePath.substr(filePath.lastIndexOf('/') + 1);
                    options.mimeType = "video/mp4";
                    options.params   = params;

                    cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL', title: '上传文件', message : '正在上传中...'});
                    ft.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable) {
                            cordova.plugin.pDialog.setProgress(parseInt(progressEvent.loaded / progressEvent.total * 100));
                        } else {
//                            loadingStatus.increment();
                        }
                    };
                    ft.upload(filePath,serverFilePath, win, fail, options);
                    return defered.promise;
                }
            },

            video: {
                getAll: function(query,callback) {
                    _myHttpGet('/video?' + _parseGetParams(query), callback);
                },
                getById: function(id,callback) {
                    _myHttpGet('/video?id=' + id, callback);
                }
            },


            //任务相关api
            task: {
                getAll: function(query,callback) {
                    _myHttpGet('/task?' + _parseGetParams(query), callback);
                },

                getByTaskId : function( id, callback ){

                    _myHttpGet('/task/?id=' + id, function(err,data){
                        console.log(data);
                        if(err){
                            callback(err,null);
                        }else{
                            var task = {
                                title : data.title,
                                description : data.description,
                                startTime : data.startTime,
                                endTime : data.endTime,
                                moneyAll : data.moneyAll,
                                moneyAwarded : data.moneyAwarded,
                                adoptMoney : data.adoptMoney,
                                sharedMoney : data.sharedMoney,
                                demoVideo : data.demoVideo,
                                childVideo : data.childVideo

                            };
                            callback(null,task);
                        }

                    });
//                    var task = {
//                    title : '录制关于可口可乐的广告',
//                    content : '1.拍摄视频 2.上传视频审核成功可获得1000元奖励 3.浏览获取0.1元分成',
////                    hasVideo : 1,   //判断任务类型，分享类有视频，上传类无视频
////                    videoUrl : '',
//                    publisherVideo : [],
//                    participantVideo : [],
////                    viewCount : '20',
//                    createTime : '2015.11.14',
//                    deadline : '2015.11.30',
//                    budget : '10000',   //预算金额
//                    spending : '2000',  //已花销金额
//                    shareValue : '0.1', //分享提成
//                    adoptValue : '1000' //采纳提成
//                    }

                }
            },

            account : {
                getAccount : function(callback){
                    var curAccount = {
                        userName : '小w',
                        userFace : '',
                        userValue : '346'
                    };
                    callback(curAccount);
                },

                addUserShare: function(userId,videoId) {
                    _myHttpGet('/share?userId=' + userId + '&videoId=' + videoId, callback);
                },

                //我发布的视频或分享的视频
                queryVideo : function(type,callback){
                    if(type) {
                        _myHttpGet('/video?uploadUser=1', callback);
                    }else {
                        _myHttpGet('/video?sharedUser=1', callback);
                    }
                }
            }
        }
    }]);