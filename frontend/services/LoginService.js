class LoginService {
    constructor($rootScope, $sessionStorage, SocketService, EVENTS) {
        this.$rootScope = $rootScope;
        this.SocketService = SocketService;
        this.$storage = $sessionStorage;
        this.EVENTS = EVENTS;

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
        this.$rootScope.$emit(this.EVENTS.LOGGED_IN, user);
        this.$rootScope.$emit(this.EVENTS.USER_UPDATE, user);
    }

    logout() {
        this.SocketService.emit(this.SocketService.events.logout, this.user);
        this.$rootScope.$emit(this.EVENTS.LOGGED_OUT, this.user);
        delete this.$storage.user;
        delete this.user;
    }

    getUser() {
        return this.user;
    }
 }

LoginService.$inject = [
    '$rootScope',
    '$sessionStorage',
    'SocketService',
    'EVENTS'];
export default LoginService;
