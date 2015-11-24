angular.module('havefun.controllers')
    .controller('dashController',function($sce,$scope,$ionicTabsDelegate,$ionicPopup,$timeout,$q,$ionicScrollDelegate,queryService,shareService,modalService) {
        window.scope = $scope;
        $scope.types = [
            {typeId: 'YLK', typeName: '娱乐控'},
            {typeId: 'SMK', typeName: '数码控'},
            {typeId: 'YXK', typeName: '游戏控'},
            {typeId: 'DYK', typeName: '电影控'}
        ];

        $scope.hasNextPage = true;
        $scope.videos = [];
        $scope.typeId = 'DYK';
        $scope.lastVideoId = 1;

        $timeout(function(){
            $ionicTabsDelegate.$getByHandle('video-type-tabs').select(1);
        });

        $scope.getTypeVideos = function(type) {
            $scope.typeId = type.typeId;
            //切换tab
            $scope.start = 0;
//            $ionicScrollDelegate.scrollTop();
            $scope.refreshVideos();
            $('.scroll-div').scrollTop(0);
        };

        _init();

        function getAllVideo(queryParam){
            var defer = $q.defer();
            queryService.video.getAll(queryParam,function(err,data){
                var videoList = data.videoList;
                var allCount = data.sum;
                if( allCount ){
                    var curCount = queryParam.start + data.videoList.length;
                    var start = queryParam.start;
                    if( curCount >= allCount  ){
                        $scope.hasNextPage = false;
                    }else{
                        start += queryParam.count;
                    }
                    defer.resolve({videoList:videoList,hasNextPage:$scope.hasNextPage,start:start});
                }else{
                    defer.resolve({videoList:videoList,hasNextPage:false,start:0});
                }

            })
            return defer.promise;
        }

        //分页获取视频
        $scope.loadMoreVideos = function(){
            var start = $scope.start;
            var count = $scope.count;
            if($scope.hasNextPage) {
                getAllVideo({type:$scope.typeId,start:start,count:count}).then(function(data){
                    $scope.hasNextPage = data.hasNextPage;
                    $scope.start = data.start;
                    Array.prototype.splice.apply($scope.videos,[$scope.videos.length,$scope.videos.length].concat(data.videoList));
                }).finally(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }
        };

        $scope.cancelAllVideo = function() {
            alert(true);
        };

        //下拉刷新
        $scope.refreshVideos = function(){
            var start = 0;
            var count = $scope.count;
            getAllVideo({type:$scope.typeId,start:start,count:count}).then(function(data){
                $scope.hasNextPage = data.hasNextPage;
                $scope.start = data.start;
                Array.prototype.splice.apply($scope.videos,[0,$scope.videos.length].concat(data.videoList));
            }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });;
        };

        $scope.shareVideo = function(video) {
            $scope.curVideo = video;
            modalService.show('templates/share.html','shareController', {video: video}).then(function(result) {
                console.log(result);
            });
        };


//        $scope.setVideoUrl = function(video,e) {
//            $(e.target).append('<source src="' + video.downLoadUrl + '"><source>');
//            $(e.target)[0].play();
//        };

//        $scope.config = {
//            preload: "none",
//            sources: [
//                {src: $sce.trustAsResourceUrl("http://www.w3schools.com/html/mov_bbb.mp4"), type: "video/mp4"}
//            ],
//            tracks: [
//                {
//                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
//                    kind: "subtitles",
//                    srclang: "en",
//                    label: "English",
//                    default: ""
//                }
//            ],
//            theme: {
//                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
//            },
//            plugins: {
//                poster: "http://www.videogular.com/assets/images/videogular.png"
//            }
//        };
        function _init(){
            // pagination
            $scope.hasNextPage = true;
            $scope.loadError = false;
            $scope.start = 0;
            $scope.count = 10;
        };
    });


