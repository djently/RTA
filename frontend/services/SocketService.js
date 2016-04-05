const io = require('socket.io-client');
import config from '../config';

class SocketService {
    constructor() {
        this.socket = io.connect(config.host);

        this.socket.on('news', function(data) {
            console.log(data);
        });
    }
}

export default SocketService;