var _private = {};

class StartAuctionDialogController {
    constructor($mdDialog, SocketService) {
        _private.$mdDialog = $mdDialog;
        _private.SocketService = SocketService;

        this.itemAmount = 1;
        this.minBid = 100;
    }

    onCancel() {
        _private.$mdDialog.hide();
    }

    onStartAuction() {
        _private.$mdDialog.hide();
        _private.SocketService.emit(
            _private.SocketService.events.startAuction,
            {
                userId: this.user.id,
                itemName: this.item.name,
                itemAmount: this.itemAmount,
                minBid: this.minBid
            }
        );
    }
}

StartAuctionDialogController.$inject = ['$mdDialog', 'SocketService'];

export default StartAuctionDialogController;
