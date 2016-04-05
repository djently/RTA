import angular from 'angular';

export default angular.module('rtaProfile', [])
    .component('rtaProfile', {
        template: require('./profile.html')
    });
