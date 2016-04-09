export default function Constants(ngModule) {
    ngModule.constant('EVENTS', {
        LOGGED_IN: 'LOGGED_IN',
        LOGGED_OUT: 'LOGGED_OUT',
        USER_UPDATE: 'USER_UPDATE'
    });
}
