var _ = require('lodash');

const AUCTION_TIME = 90000,
      BID_ADDITIONAL_TIME = 10000;
      AUCTION_TICKER = 100;

function noop() {}

function Auction() {
    var auctionQueue = [],
        eventHandlers = {
            onAddLot: noop,
            onAuctionStarted: noop,
            onAuctionEnded: noop,
            onAuctionTicker: noop,
            onPlaceBid: noop
        },
        currentAuction,
        auctionTimeout,
        auctionTicker;

    this.addToQueue = function addToQueue(user, lot) {
        var newAuction = {ownerId: user.id, lot: lot};
        if (currentAuction) {
            auctionQueue.push(newAuction);
        } else {
            startAuction(newAuction);
        }
        eventHandlers.onAddLot(newAuction);
    };

    this.state = function state() {
        return {currentAuction: currentAuction, auctionQueue: auctionQueue};
    };

    this.placeBid = function placeBid(user, bid) {
        if (!currentAuction) {
            return {error: 'No auction in progress'};
        }
        if (bid > currentAuction.winningBid) {
            _.assign(currentAuction, {
                winnnerId: user.id,
                winningBid: bid,
                timeLeft: currentAuction.timeLeft + BID_ADDITIONAL_TIME
            });

            eventHandlers.onPlaceBid(currentAuction);
            return true;
        } else {
            return {
                error: 'Your bid should be greater then current winning bid'
            };
        }
    };

    /* Auction events */
    this.onAddLot = function onAddLot(callback) {
        eventHandlers.onAddLot = callback;
        return this;
    };

    this.onAuctionStarted = function onLotStarted(callback) {
        eventHandlers.onAuctionStarted = callback;
        return this;
    };

    this.onAuctionEnded = function(callback) {
        eventHandlers.onAuctionEnded = callback;
        return this;
    };

    this.onAuctionTicker = function(callback) {
        eventHandlers.onAuctionTicker = callback;
        return this;
    };

    this.onPlaceBid = function onPlaceBid(callback) {
        eventHandlers.onPlaceBid = callback;
        return this;
    };

    /* Private */
    function getTimeLeft() {
        if (!currentAuction || !currentAuction.startTime) {
            return 0;
        } else {
            return currentAuction.startTime + AUCTION_TIME - Date.now();
        }
    }

    function setAuctionTimeout() {
        var timeLeft;
        auctionTimeout = setTimeout(function() {
            timeLeft = getTimeLeft();
            if (timeLeft > 0) {
                currentAuction.timeLeft = timeLeft;
                clearTimeout(auctionTimeout);
                return setAuctionTimeout();
            }

            clearInterval(auctionTicker);

            eventHandlers.onAuctionEnded(currentAuction);
            currentAuction = null;

            if (auctionQueue.length) {
                startAuction(auctionQueue.shift());
            }
        }, currentAuction.timeLeft);
    }

    function startAuction(auction) {
        currentAuction = auction;
        _.assign(currentAuction, {
            winnerId: auction.ownerId,
            winningBid: auction.lot.minBid,
            startTime: Date.now(),
            timeLeft: AUCTION_TIME
        });

        setAuctionTimeout(auctionTicker);

        auctionTicker = setInterval(function() {
            _.assign(currentAuction, {
                timeLeft: getTimeLeft()
            });
            eventHandlers.onAuctionTicker(
                currentAuction
            );
        }, AUCTION_TICKER);

        eventHandlers.onAuctionStarted(auction);
    }
}

module.exports = new Auction();
