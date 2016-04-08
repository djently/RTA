class LoginService {
    constructor($rootScope, $sessionStorage, SocketService) {
        this.$rootScope = $rootScope;
        this.SocketService = SocketService;
        this.$storage = $sessionStorage;

        if (this.$storage.user && this.$storage.user.login) {
            this.login(this.$storage.user.login);
        }

        this.SocketService.on(
            SocketService.events.loggedIn,
            this.loggedIn.bind(this)
        );
    }

    login(login) {
        this.SocketService.emit(this.SocketService.events.login, login);
    }

    loggedIn(user) {
        this.$storage.user = user;
        this.user = user;
        this.$rootScope.$emit('LOGGED_IN', user);
    }

    logout() {
        this.SocketService.emit(this.SocketService.events.logout, this.user);
        this.$rootScope.$emit('LOGGED_OUT', this.user);
        delete this.$storage.user;
        delete this.user;
    }

    getUser() {
        return this.user;
    }
 }

LoginService.$inject = ['$rootScope', '$sessionStorage', 'SocketService'];
export default LoginService;
