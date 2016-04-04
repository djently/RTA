export default function rtaProfileModule(ngModule) {
    return ngModule
        .component('rtaProfile', {
            template: require('./profile.html')
        });
}
