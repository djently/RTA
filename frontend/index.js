/* Styles */
require('./styles/global.css');
require('./styles/rta.css');

/* Vendor modules */
import angular from 'angular';
import 'angular-ui-router';
import 'ngstorage';

/* App modules */
import './components/profile';
import './components/inventory';
import './components/auction';

/* Main module */
import Constants from './constants';
import Router from './router';

const ngModule = angular.module('RTA',
    [
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        'ngStorage',

        // App components
        'rtaProfile',
        'rtaInventory',
        'rtaAuction',
    ]
);

Constants(ngModule);
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
