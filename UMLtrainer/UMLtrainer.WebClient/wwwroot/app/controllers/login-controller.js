var stateConfig = function ($stateProvider) {
    $stateProvider.state({
        controller: "login-controller as ctrl",
        name: "login",
        templateUrl: "Login",
        url: "/login"
    });
};
var LoginController = (function () {
    function LoginController($state) {
        this.$state = $state;
    }
    LoginController.prototype.login = function () {
        this.$state.go("topics");
    };
    return LoginController;
}());
stateConfig.$inject = ["$stateProvider"];
LoginController.$inject = ["$state"];
angular.module("app.user", [])
    .controller("login-controller", LoginController)
    .config(stateConfig);
//# sourceMappingURL=login-controller.js.map