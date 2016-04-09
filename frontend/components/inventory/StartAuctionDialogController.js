var _private = {};

class StartAuctionDialogController {
    constructor($mdDialog) {
        _private.$mdDialog = $mdDialog;

        this.itemAmount = 1;
    }

    onCancel() {
        _private.$mdDialog.hide();
    }

    onStartAuction() {
        _private.$mdDialog.hide('start auction!');
    }
}

StartAuctionDialogController.$inject = ['$mdDialog'];

export default StartAuctionDialogController;
