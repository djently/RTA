/* Styles */
require('./styles/global.css');

/* Vendor modules */
import angular from 'angular';
import 'angular-ui-router';

/* App modules */
import './components/profile';

/* Main module */
import Router from './router';

const ngModule = angular.module('RTA',
    [
        'ngMaterial',
        'ui.router',
        'rtaProfile'
    ]
);
Router(ngModule);

/* Controllers */
import AppController from './controllers/AppController';
import LoginController from './controllers/LoginController';

/* Services */
import SocketService from './services/SocketService';
import LoginService from './services/LoginService';

angular.module('RTA')
    .service('LoginService', LoginService)
    .service('SocketService', SocketService)
    .controller('AppController', AppController)
    .controller('LoginController', LoginController)
    ;