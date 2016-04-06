export default function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            template: '<ui-view/>',
            resolve: {
                user: function($state, LoginService) {
                    var user = LoginService.getUser();
                    console.log(user);
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
            template: require('./pages/main.html')
        })
        .state('login', {
            url: '/login',
            template: require('./pages/login.html'),
            controller: 'LoginController',
            controllerAs: 'LoginCtrl',
            resolve: {
                user: function($state, LoginService) {
                    return 
                        LoginService.getUser() ? $state.go('app.main') : null;
                }
            }
        })
        .state('404', {
            url: '/404',
            template: require('./pages/404.html')
        })
        ;

    $urlRouterProvider.otherwise('/app/rta');
}
