class LoginService {
    constructor(SocketService) {
        this.SocketService = SocketService;
    }

    login(username) {
        console.log(username);
    }
}

LoginService.$inject = ['SocketService'];
export default LoginService;
