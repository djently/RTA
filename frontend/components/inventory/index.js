export default function rtaInventoryModule(ngModule) {
    return ngModule
        .component('rtaProfile', {
            template: require('./profile.html')
        });
}
