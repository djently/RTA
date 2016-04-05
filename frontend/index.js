/* Styles */
require('./styles/global.css');

/* Vendor modules */
import angular from 'angular';
import 'angular-ui-router';

/* App modules */
import './components/profile';

/* Main module */

angular.module('RTA',
    [
        'ngMaterial',
        'ui.router',
        'rtaProfile'
    ]
)
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: require('./pages/main.html')
        })
        .state('login', {
            url: '/login',
            template: require('./pages/login.html'),
            controller: 'LoginController',
            controllerAs: 'LoginCtrl'
        })
        .state('404', {
            url: '/404',
            template: require('./pages/404.html')
        })
        ;

    $urlRouterProvider.otherwise('/404');
})
.run(function($state) {
    $state.go('login');
});

/* Controllers */
import LoginController from './controllers/LoginController';

/* Services */
import SocketService from './services/SocketService';
import LoginService from './services/LoginService';

angular.module('RTA')
    .service('LoginService', LoginService)
    .service('SocketService', SocketService)
    .controller('LoginController', LoginController)
    ;