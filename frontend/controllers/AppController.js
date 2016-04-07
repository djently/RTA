class AppController {
    constructor($state, LoginService, SocketService) {
        SocketService.on('rta.disconnect', function() {
            LoginService.logout();
            $state.go('login');
            alert('You have been disconnected!');
        });
    }
}

AppController.$inject = ['$state', 'LoginService', 'SocketService'];

export default AppController;