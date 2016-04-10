import angular from 'angular';

export default angular.module('rtaProfile', [])
    .component('rtaProfile', {
        template: require('./profile.html'),
        controller: function($rootScope, LoginService, EVENTS) {
            var self = this;

            function loadUserData(user) {
                self.user = user;
                self.items = user.Items || [];
            }

            loadUserData(LoginService.getUser());
            $rootScope.$on(EVENTS.USER_UPDATE, (e, user) => {
                loadUserData(user);
                $scope.$digest();
            });

            self.logout = function() {
                LoginService.logout();
            };
        },
        controllerAs: 'profileCtrl'
    });
