angular.module('havefun.controllers')
    .controller('shareVideoController', function($scope,$stateParams,$ionicModal,queryService) {
        queryService.video.getById($stateParams.videoId,function(err,data) {
            $scope.video = data[0];
        });
    });
