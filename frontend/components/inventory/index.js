require('./inventory-style.css');
import angular from 'angular';

import InventoryController from './InventoryController';
import StartAuctionDialogController from './StartAuctionDialogController';

const rtaInventoryModule = angular.module('rtaInventory', [])
    .controller('InventoryController', InventoryController)
    .controller('StartAuctionDialogController', StartAuctionDialogController)
    .component('rtaInventory', {
        template: require('./inventory.html'),
        controller: 'InventoryController',
        controllerAs: 'InventoryCtrl'
    });

export default rtaInventoryModule;
