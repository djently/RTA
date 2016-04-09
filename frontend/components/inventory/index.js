require('./inventory-style.css');
import angular from 'angular';

export default angular.module('rtaInventory', [])
    .component('rtaInventory', {
        template: require('./inventory.html'),
        controller: function(LoginService) {
            var self = this;

            self.user = LoginService.getUser();
            self.items = self.user.Items || [];
        },
        controllerAs: 'InventoryCtrl'
    });
