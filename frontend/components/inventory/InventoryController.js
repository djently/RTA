var _private = {};

class InventoryController {
    constructor($rootScope, $scope, $mdDialog, LoginService, EVENTS) {
        var self = this;

        _private.$mdDialog = $mdDialog;

        function loadUserData(user) {
            self.user = user;
            self.items = user.Items || [];
        }

        loadUserData(LoginService.getUser());
        $rootScope.$on(EVENTS.USER_UPDATE, (e, user) => {
            loadUserData(user);
            $scope.$digest();
        });
    }

    startAuction(item, $event) {
        _private.$mdDialog.show({
            targetEvent: $event,
            template: require('./start-auction-dialog.html'),
            locals: {
                user: this.user, item
            },
            bindToController: true,
            controllerAs: 'Dialog',
            controller: 'StartAuctionDialogController',
            clickOutsideToClose: true
        });
    }
}

InventoryController.$inject = [
    '$rootScope',
    '$scope',
    '$mdDialog',
    'LoginService',
    'EVENTS'
];

export default InventoryController;
