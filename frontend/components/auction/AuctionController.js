class AuctionController {
    constructor($scope, LoginService, SocketService) {
        var self = this;
        self.userId = LoginService.getUser().id;
        SocketService.emit(SocketService.events.getAuctionState, true);

        SocketService.on(
            SocketService.events.pushAuctionState,
            function(auctionState) {
                self.currentAuction = auctionState.currentAuction;
                $scope.$digest();
            }
        );

        SocketService.on(
            SocketService.events.auctionEnded,
            function(auctionState) {
                self.currentAuction = null;
                $scope.$digest();
            }
        );
    }
}

AuctionController.$inject = ['$scope', 'LoginService', 'SocketService'];
export default AuctionController;
