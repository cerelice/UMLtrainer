class MenuController {
    constructor(private $state: ng.ui.IStateService) {

    }
}

MenuController.$inject = ["$state"];
angular.module("app.menu", []).controller("menu-controller", MenuController);