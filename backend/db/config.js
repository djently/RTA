const common = {
    'username': 'rtauser',
    'password': 'rtauser',
    'host': '127.0.0.1',
    'dialect': 'mysql'
};

module.exports = {
    'development': Object.assign({}, common, {
        'database': 'rta.dev'
    }),
    'test': Object.assign({}, common, {
        'database': 'rta.test'
    }),
    'production': Object.assign({}, common, {
        'database': 'rta.prod'
    })
};
