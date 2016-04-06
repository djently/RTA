/* Styles */
require('./styles/global.css');

/* Vendor modules */
import angular from 'angular';
import 'angular-ui-router';

/* App modules */
import './components/profile';

/* Main module */
import router from './router';

angular.module('RTA',
    [
        'ngMaterial',
        'ui.router',
        'rtaProfile'
    ]
)
.config(router)
.run(function($state, $rootScope) {
    $state.go('app.main');

    $rootScope.$on('LOGGED_IN', function() {
        console.log('LOGGED_IN');
        $state.go('app.main');
    });
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