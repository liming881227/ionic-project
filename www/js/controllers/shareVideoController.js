angular.module('havefun.controllers')
    .controller('shareVideoController',
    ['$scope','$stateParams','$ionicModal','queryService',
    function($scope,$stateParams,$ionicModal,queryService) {
        queryService.video.getById($stateParams.videoId,function(err,data) {
            $scope.video = data[0];
        });
    }]);
