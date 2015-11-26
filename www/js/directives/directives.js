
angular.module('havefun.directives').directive(
    'videoPoster', ['$sce',function ($sce) {
        return {
            restrict: 'EA',
            link: function ($scope, element, attrs) {
                var videoPoster = $scope.$eval(attrs);
            }
        };
    }]
);

