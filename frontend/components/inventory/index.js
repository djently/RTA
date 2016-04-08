require('./inventory-style.css');
import angular from 'angular';

export default angular.module('rtaInventory', [])
    .component('rtaInventory', {
        template: require('./inventory.html'),
        controller: function() {
            var self = this;

            self.items = [
                {}
            ];
        },
        controllerAs: 'InventoryCtrl'
    });
