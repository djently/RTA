import angular from 'angular';

export default angular.module('rtaProfile', [])
    .component('rtaProfile', {
        template: require('./profile.html'),
        controller: function(LoginService) {
            var self = this;

            self.user = LoginService.getUser();

            self.logout = function() {
                LoginService.logout();
            };
        },
        controllerAs: 'profileCtrl'
    });
