require('./auction-style.css');
import angular from 'angular';

import AuctionController from './AuctionController';

export default angular.module('rtaAuction', [])
    .controller('AuctionController', AuctionController)
    .component('rtaAuction', {
        template: require('./auction.html'),
        controller: 'AuctionController',
        controllerAs: 'AuctionCtrl'
    });
