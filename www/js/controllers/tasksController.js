angular.module('havefun.controllers')
.controller('tasksController',
    ['$scope', 'queryService',
    function($scope, queryService) {
    queryService.task.getAll('',function(err,data) {
        $scope.tasks = data;
    });
}]);
