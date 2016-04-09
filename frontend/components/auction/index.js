import angular from 'angular';

export default angular.module('rtaAuction', [])
    .component('rtaAuction', {
        template: require('./auction.html'),
        controller: function() {
            var self = this;

            self.items = [
                {
                    name: 'Bread',
                    quantity: 30
                },
                {
                    name: 'Carrot',
                    quantity: 18
                },
                {
                    name: 'Diamond',
                    quantity: 1
                }
            ];
        },
        controllerAs: 'InventoryCtrl'
    });
