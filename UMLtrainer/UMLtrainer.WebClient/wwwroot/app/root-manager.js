"use strict";
var RootManager = (function () {
    function RootManager($rootScope) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.showLoadScreen = function () {
            _this.changeScreenState(true);
        };
        this.hideLoadScreen = function () {
            _this.changeScreenState(false);
        };
    }
    RootManager.prototype.changeScreenState = function (isLoading) {
        this.$rootScope.stateIsLoading = isLoading;
    };
    ;
    return RootManager;
}());
exports.RootManager = RootManager;
var rootManagerFactory = function ($rootScope) {
    return new RootManager($rootScope);
};
rootManagerFactory.$inject = ["$rootScope"];
angular
    .module("app-common", [])
    .factory("rootManager", rootManagerFactory);
//# sourceMappingURL=root-manager.js.map