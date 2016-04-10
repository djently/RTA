require('./auction-style.css');
import angular from 'angular';

import AuctionController from './AuctionController';
import TimeLeftFilter from './TimeLeftFilter';

export default angular.module('rtaAuction', [])
    .filter('timeLeft', TimeLeftFilter)
    .controller('AuctionController', AuctionController)
    .component('rtaAuction', {
        template: require('./auction.html'),
        controller: 'AuctionController',
        controllerAs: 'AuctionCtrl'
    });
