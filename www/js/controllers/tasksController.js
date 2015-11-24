angular.module('havefun.controllers')
.controller('tasksController', function($scope, queryService) {
    queryService.task.getAll('',function(err,data) {
        $scope.tasks = data;
    })
});
