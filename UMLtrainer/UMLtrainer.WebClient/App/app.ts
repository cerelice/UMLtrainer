import {defaultState} from "./settings";
import {RootManager} from "./root-manager";
import {CustomHttpInterceptor} from "./request-response-handler";
import "./settings";
import "./root-manager";
import "./controllers/login-controller"
import "./controllers/topics-controller"
import "./controllers/menu-controller"

let stateConfig = (
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider): void => {
    $urlRouterProvider.otherwise(`/${defaultState}`);

    $stateProvider.state({
        abstract: true,
        name: "base-menu",
        views: {
            "": {
                templateUrl: "Shared/BaseMenu"
            }
        }
    });
};

let httpConfig = ($httpProvider: ng.IHttpProvider) => {
    $httpProvider.interceptors.push(CustomHttpInterceptor.factory);
};

let themeConfig = ($mdThemingProvider: angular.material.IThemingProvider) => {
    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');
};

let onStart = ($rootScope: ng.IRootScopeService, rootManager: RootManager) => {
    rootManager.hideLoadScreen();

    $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
        rootManager.showLoadScreen();
    });

    $rootScope.$on("$stateChangeSuccess", () => {
        rootManager.hideLoadScreen();
    });
};

stateConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
onStart.$inject = ["$rootScope", "rootManager"];
themeConfig.$inject = ["$mdThemingProvider"];

angular
    .module("app", ["app-common", 'ngMaterial', 'ui.router', "ngSanitize", "app.user", "app.topics", "app.menu", 'ui.tinymce'])
    .config(httpConfig)
    .config(stateConfig)
    .config(themeConfig)
    .run(onStart);
