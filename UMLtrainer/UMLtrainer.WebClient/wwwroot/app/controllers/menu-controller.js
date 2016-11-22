var MenuController = (function () {
    function MenuController($state) {
        this.$state = $state;
    }
    return MenuController;
}());
MenuController.$inject = ["$state"];
angular.module("app.menu", []).controller("menu-controller", MenuController);
//# sourceMappingURL=menu-controller.js.map