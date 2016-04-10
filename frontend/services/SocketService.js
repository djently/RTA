const io = require('socket.io-client');
import config from '../config';

const socketEvents = {
    disconnected: 'rta.disconnected',
    login: 'rta.login',
    logout: 'rta.logout',
    loggedIn: 'rta.loggedIn',
    updateUser: 'rta.updateUser',
    startAuction: 'rta.startAuction',

    auctionStarted: 'rta.auctionStarted',
    auctionEnded: 'rta.auctionEnded',
    pushAuctionState: 'rta.pushAuctionState'
};

class SocketService {
    constructor() {
        this.socket = io.connect(config.host);

        this.events = socketEvents;

        this.socket.on('connected', function(msg) {
            console.info(msg);
        });
    }

    on(eventName, callback) {
        this.socket.on(eventName, callback);
    }

    emit(eventName, data) {
        this.socket.emit(eventName, data);
    }
}

export default SocketService;
