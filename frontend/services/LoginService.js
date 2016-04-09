var _private = {};

class LoginService {
    constructor($rootScope, $sessionStorage, SocketService, EVENTS) {
        _private.$rootScope = $rootScope;
        _private.SocketService = SocketService;
        _private.$storage = $sessionStorage;
        _private.EVENTS = EVENTS;

        let $storage = $sessionStorage;

        if ($storage.user && $storage.user.login) {
            this.login($storage.user.login);
        }

        SocketService.on(
            SocketService.events.loggedIn,
            this.loggedIn.bind(this)
        );
    }

    login(login) {
        _private.SocketService.emit(_private.SocketService.events.login, login);
    }

    loggedIn(user) {
        _private.$storage.user = user;
        this.user = user;
        _private.$rootScope.$emit(_private.EVENTS.LOGGED_IN, user);
        _private.$rootScope.$emit(_private.EVENTS.USER_UPDATE, user);
    }

    logout() {
        _private.SocketService.emit(
            _private.SocketService.events.logout, this.user
        );
        _private.$rootScope.$emit(_private.EVENTS.LOGGED_OUT, this.user);
        delete _private.$storage.user;
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
