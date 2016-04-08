class LoginController {
    constructor(LoginService) {
        this.LoginService = LoginService;
    }

    login() {
        let username = this.user.login && this.user.login.trim();

        if (!username) {
            return;
        }

        this.LoginService.login(username);
    }

    keypressLogin($event) {
        if ($event.charCode === 13) this.login();
    }
}

LoginController.$inject = ['LoginService'];
export default LoginController;
