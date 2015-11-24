'use strict';

/**
 * @ngdoc function
 * @name cnodejs.filters:tabName
 * @description
 * # tabName
 * tab name filter of the cnodejs app
 */

angular.module('havefun.filters')
.filter('trustUrl', function($sce) {
      return function(content) {
          return $sce.trustAsResourceUrl(content);
      };
})

.filter('statusFilter', function() {
    return function(status) {
        switch (status) {
            case 0 :
                return '未审核';
                break;
            case 1:
                return '己通过';
                break;
            case 2:
                return '未通过';
                break;
        }
    };
});
