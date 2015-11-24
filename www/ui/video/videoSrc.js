/**
 */
//
//angular.module('havefun.directives')
//    .directive('videoSrc',['$scope',function($scope) {
//        return {
//            restrict: 'AE',
//            link: function($scope, element, attr, ngModel) {
//                var read;
//                console.log('video');
//            }
//        }
//    }]);
//
//
//'use strict';

angular.module('havefun.directives').directive(
    'videoSrc', function ($sce) {
        return {
            restrict: 'EA',
            scope: true,
            templateUrl: '/ui/video/video.html',
            replace: true,
            link: function ($scope, element, attrs) {
                $scope.curVideo = $scope.$eval(attrs.videoSrc);

//                $scope.$watch(function() {return attrs.videoSrc},function(video) {
//                });
                $scope.config = {
                    preload: "none",
                    sources: [
                        {src: $sce.trustAsResourceUrl('http://www.w3schools.com/html/mov_bbb.mp4'), type: "video/mp4"}
                    ],
                    tracks: [
                        {
                            src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                            kind: "subtitles",
                            srclang: "en",
                            label: "English",
                            default: ""
                        }
                    ],
                    theme: {
                        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                    },
                    plugins: {
                        poster: "http://www.videogular.com/assets/images/videogular.png"
                    }
                };
            }
        };
    }
);

