let stateConfig = ($stateProvider: angular.ui.IStateProvider) => {
    $stateProvider.state({
        controller: "login-controller as ctrl",
        name: "login",
        templateUrl: "Login",
        url: "/login"
    });
};

class LoginController {
    public username: string;
    public password: string;

    constructor(private $state: ng.ui.IStateService) {
    }

    login() {
        this.$state.go("topics");
    }
}
stateConfig.$inject = ["$stateProvider"];
LoginController.$inject = ["$state"];

angular.module("app.user", [])
    .controller("login-controller", LoginController)
    .config(stateConfig);
