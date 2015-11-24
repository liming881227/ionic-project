'use strict';
/**
 * Created by liming on 2015-11-04
 * 模态框service
 * 使用方法:
*           modalService.show('templates/share.html','shareController', {video: video}).then(function(result) {
                console.log(result);
            })
 */
angular.module('havefun.services')
    .factory('modalService',function($ionicModal, $rootScope, $q, $injector, $controller){
        return {
            show: show,
            hide: hide
        };

        var modalScope,
            ctrlInstance,
            thisScopeId;

        function show(templateUrl, controller, parameters) {
            var deferred = $q.defer();
                modalScope = $rootScope.$new();
                thisScopeId = modalScope.$id;

            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: modalScope,
                animation: 'slide-in-up'  //向上弹出
            }).then(function (modal) {
                modalScope.modal = modal;
                modalScope.openModal = function () {
                    modalScope.modal.show();
                };
                modalScope.closeModal = function (result) {
                    deferred.resolve(result);
                    modalScope.modal.hide();
                };
                modalScope.$on('modal.hidden', function (thisModal) {
                    if (thisModal.currentScope) {
                        var modalScopeId = thisModal.currentScope.$id;
                        if (thisScopeId === modalScopeId) {
                            deferred.resolve(null);
                            _cleanup(thisModal.currentScope);
                        }
                    }
                });
                console.log(parameters);
                var locals = {'$scope': modalScope, 'parameters': parameters };
                ctrlInstance = $controller(controller, locals);
                modalScope.modal.show();
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function hide() {
            modalScope.modal.hide();
        }

        /**
         * 清理scope
         * @param scope
         * @private
         */
        function _cleanup(scope) {
            scope.$destroy();
            if (scope.modal) {
                scope.modal.remove();
            }
        }
    });