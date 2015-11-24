// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('havefun', [
        'ionic',
        'havefun.controllers',
        'havefun.services' ,
        'ngCordova',
        'ngSanitize',
        'com.2fdevs.videogular',
        'com.2fdevs.videogular.plugins.controls',
        'com.2fdevs.videogular.plugins.overlayplay',
        'com.2fdevs.videogular.plugins.poster'
    ])

    .constant("$ionicLoadingConfig",{   //载入指示器
        template : "加载中 ...",
        duration: 600
    })

    .run(function($ionicPlatform,$rootScope,$log,utilService,shareService) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

            ionic.Platform.isFullScreen = true;  //deal the situation of Scrolling does not work when the keyboard is visible
            if ('addEventListener' in document) {
                document.addEventListener("deviceready", function() {
//                    alert(FileTransfer);
//                    cordova.plugin.pDialog.init({progressStyle : 'HORIZONTAL', title: '上传视频', message : '正在上传中...'});
//                    cordova.plugin.pDialog.setProgress(50);
                }, false);
            }
        });


        //切换动画
        var inited = false,
            init,
            changeStart,
            changeSuccess,
            changeError;

        changeStart = function (e, toState, toParams, fromState, fromParams) {
            $('video').each(function(index,node) {
                node.pause();
            })
        };

        changeSuccess = changeError = function (e, toState, toParams, fromState, fromParams) {
        };

        init = function () {
            if (inited) {
                return;
            }
            inited = true;
            $rootScope.$on('$stateChangeStart', changeStart);
            $rootScope.$on('$stateChangeSuccess', changeSuccess);
            $rootScope.$on('$stateChangeError', changeError);
            $rootScope.$on('$stateNotFound', changeError);

            $rootScope.$on('$routeChangeStart', changeStart);
            $rootScope.$on('$routeChangeSuccess', changeSuccess);
            $rootScope.$on('$routeChangeError', changeError);
        };

        $rootScope.$on('$stateChangeSuccess', init);

    })

    .config(function($ionicConfigProvider,$sceDelegateProvider) {
        $ionicConfigProvider.views.maxCache(5);
        // 设置tab切换栏位置
        $ionicConfigProvider.tabs.position("bottom");
        // 设置tab样式
        $ionicConfigProvider.tabs.style("standard");
        //配置导航栏标题显示位置
        $ionicConfigProvider.platform.android.navBar.alignTitle("center");
        //关闭动画效果
    //  $ionicConfigProvider.platform.android.views.transition("none");
        $ionicConfigProvider.views.transition("none");

        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?w3school\.com/.+$')]);
    })

    .config(function($stateProvider, $urlRouterProvider) {
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/videos');

        $stateProvider
            .state('test', {
                url: '/test',
                templateUrl: 'test.html'
            })

        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        .state('tab.dash', {
            url: '/videos',
            views: {
              'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'dashController'
              }
            }
        })

        .state('tab.tasks', {
          url: '/tasks',
          views: {
            'tab-tasks': {
              templateUrl: 'templates/tasks.html',
              controller: 'tasksController'
            }
          }
        })

        .state('tab.task-detail', {
          url: '/task/:taskId',
          views: {
            'tab-tasks': {
              templateUrl: 'templates/task-detail.html',
              controller: 'taskDetailController'
            }
          }
        })

        .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'accountController'
                    }
                }
            })

        .state('share', {
            url: '/share?videoId&taskId&userId',
            templateUrl: 'templates/shareVideo.html',
                controller: 'shareVideoController'
        })
    });

    angular.module('havefun.services', []);
    angular.module('havefun.filters', []);
    angular.module('havefun.directives', []);
    angular.module('havefun.controllers', ['havefun.services','havefun.directives','havefun.filters']);
    angular.module('havefun.modules',[]);