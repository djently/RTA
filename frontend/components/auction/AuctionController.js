class AuctionController {
    constructor($rootScope, $scope, LoginService, SocketService, EVENTS) {
        var self = this;
        self.userId = LoginService.getUser().id;
        SocketService.emit(SocketService.events.getAuctionState, true);

        self.placeBid = function placeBid() {
            SocketService.emit(
                SocketService.events.placeBid,
                self.bid
            );
        };

        SocketService.on(
            SocketService.events.pushAuctionState,
            function(auctionState) {
                self.currentAuction = auctionState.currentAuction;
                self.winnerId = self.currentAuction.winnerId;

                if (!self.bid) {
                    self.bid = self.currentAuction.winningBid;
                }

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
}

AuctionController.$inject = [
    '$rootScope', '$scope', 'LoginService', 'SocketService', 'EVENTS'
];
export default AuctionController;
