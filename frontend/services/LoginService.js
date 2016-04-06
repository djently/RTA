class LoginService {
    constructor($rootScope, SocketService) {
        this.$rootScope = $rootScope;
        this.SocketService = SocketService;

        this.SocketService.on(
            SocketService.events.loggedIn,
            this.loggedIn.bind(this)
        );
    }

    login(login) {
        this.SocketService.emit(this.SocketService.events.login, login);
    }

    loggedIn(user) {
        this.user = user;
        this.$rootScope.$emit('LOGGED_IN', user);
    }

    loggedOut() {
        delete this.user;
    }

    getUser() {
        return this.user;
    }
 }

LoginService.$inject = ['$rootScope', 'SocketService'];
export default LoginService;
