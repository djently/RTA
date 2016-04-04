import angular from 'angular';

export default angular.module('RTA.profile', [])
    .component('rtaProfile', {
        template: require('./profile.html')
    });
