class AppController {
    constructor($state, $rootScope, LoginService, SocketService) {
        SocketService.on(SocketService.events.disconnected, function() {
            LoginService.logout();
            alert('You have been disconnected!');
        });

        SocketService.on(SocketService.events.logout, function() {
            $state.go('login');
        });

        $rootScope.$on('LOGGED_OUT', function() {
            $state.go('login');
        });
    }
}

AppController.$inject = ['$state', '$rootScope', 'LoginService', 'SocketService'];

export default AppController;