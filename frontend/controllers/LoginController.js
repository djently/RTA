class LoginController {
    constructor(LoginService) {
        this.user = {};

        this.LoginService = LoginService;
    }

    login() {
        let username = this.user.login && this.user.login.trim();

        if (!username) {
            return;
        }

        this.LoginService.login(username);
    }
}

LoginController.$inject = ['LoginService'];
export default LoginController;