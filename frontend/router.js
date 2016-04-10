export default function Router(ngModule) {
    ngModule.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    user: function($state, LoginService) {
                        var user = LoginService.getUser();

                        if (user) {
                            return user;
                        } else {
                            $state.go('login');
                        }
                    }
                }
            })
            .state('app.main', {
                url: '/rta',
                template: require('./pages/main.html'),
                controller: 'AppController'
            })
            .state('login', {
                url: '/login',
                template: require('./pages/login.html'),
                controller: 'LoginController',
                controllerAs: 'LoginCtrl',
                resolve: {
                    user: function($state, LoginService) {
                        if (LoginService.getUser()) {
                            return $state.go('app.main');
                        }
                        return null;
                    }
                }
            })
            .state('404', {
                url: '/404',
                template: require('./pages/404.html')
            })
            ;

        $urlRouterProvider.otherwise('/app/rta');
    })
    .run(function($state, $rootScope) {
        $state.go('app.main');

        $rootScope.$on('LOGGED_IN', function() {
            $state.go('app.main');
        });
    });
}

