(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var settings_1 = require("./settings");
var request_response_handler_1 = require("./request-response-handler");
require("./settings");
require("./root-manager");
require("./controllers/login-controller");
require("./controllers/topics-controller");
require("./controllers/menu-controller");
var stateConfig = function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/" + settings_1.defaultState);
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
var httpConfig = function ($httpProvider) {
    $httpProvider.interceptors.push(request_response_handler_1.CustomHttpInterceptor.factory);
};
var themeConfig = function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('orange');
};
var onStart = function ($rootScope, rootManager) {
    rootManager.hideLoadScreen();
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        rootManager.showLoadScreen();
    });
    $rootScope.$on("$stateChangeSuccess", function () {
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
},{"./controllers/login-controller":2,"./controllers/menu-controller":3,"./controllers/topics-controller":4,"./request-response-handler":5,"./root-manager":6,"./settings":8}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var MenuController = (function () {
    function MenuController($state) {
        this.$state = $state;
    }
    return MenuController;
}());
MenuController.$inject = ["$state"];
angular.module("app.menu", []).controller("menu-controller", MenuController);
},{}],4:[function(require,module,exports){
"use strict";
require("../service/topics-service");
var stateConfig = function ($stateProvider) {
    $stateProvider.state({
        name: "topics",
        url: "/topics",
        parent: "base-menu",
        views: {
            "": {
                controller: "topics-controller as ctrl",
                templateUrl: "Topics/Index"
            },
            "menu@base-menu": {
                controller: "menu-controller as ctrl",
                templateUrl: "Common/Menu"
            }
        }
    });
};
var TopicsController = (function () {
    function TopicsController(topicsService) {
        this.topicsService = topicsService;
        this.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };
        this.tinymceModel = 'Initial content';
    }
    Object.defineProperty(TopicsController.prototype, "topics", {
        get: function () {
            return this.topicsService.getTopics();
        },
        enumerable: true,
        configurable: true
    });
    return TopicsController;
}());
stateConfig.$inject = ["$stateProvider"];
TopicsController.$inject = ["topics-service"];
angular.module("app.topics")
    .controller("topics-controller", TopicsController)
    .config(stateConfig);
},{"../service/topics-service":7}],5:[function(require,module,exports){
"use strict";
var CustomHttpInterceptor = (function () {
    function CustomHttpInterceptor($q, rootManager) {
        var _this = this;
        this.$q = $q;
        this.rootManager = rootManager;
        this.response = function (response) {
            return _this.$q.when(response);
        };
        this.responseError = function (rejection) {
            return _this.$q.reject(rejection);
        };
    }
    CustomHttpInterceptor.factory = function ($q, rootManager) {
        return new CustomHttpInterceptor($q, rootManager);
    };
    return CustomHttpInterceptor;
}());
exports.CustomHttpInterceptor = CustomHttpInterceptor;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
"use strict";
var TopicsService = (function () {
    function TopicsService() {
        this.topics = [
            {
                name: "Lection 1: Curabitur a scelerisque risus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet scelerisque lacus. Mauris quis sagittis orci. Suspendisse ipsum odio, pharetra.",
                data: "<ul><li>render me please</li></ul>"
            },
            {
                name: "Lection 2: Curabitur a scelerisque risus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet scelerisque lacus. Mauris quis sagittis orci. Suspendisse ipsum odio, pharetra.",
                data: "<ul><li>render me please</li></ul>"
            },
            {
                name: "Lection 3: Curabitur a scelerisque risus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet scelerisque lacus. Mauris quis sagittis orci. Suspendisse ipsum odio, pharetra.",
                data: "<ul><li>render me please</li></ul>"
            },
            {
                name: "Lection 4: Curabitur a scelerisque risus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet scelerisque lacus. Mauris quis sagittis orci. Suspendisse ipsum odio, pharetra.",
                data: "<ul><li>render me please</li></ul>"
            },
            {
                name: "Lection 5: Curabitur a scelerisque risus",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin imperdiet scelerisque lacus. Mauris quis sagittis orci. Suspendisse ipsum odio, pharetra.",
                data: "<ul><li>render me please</li></ul>"
            }
        ];
    }
    TopicsService.prototype.getTopics = function () {
        return this.topics;
    };
    return TopicsService;
}());
exports.TopicsService = TopicsService;
angular.module("app.topics", []).service("topics-service", TopicsService);
},{}],8:[function(require,module,exports){
"use strict";
exports.defaultState = "login";
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBcHAvYXBwLnRzIiwiQXBwL2NvbnRyb2xsZXJzL2xvZ2luLWNvbnRyb2xsZXIudHMiLCJBcHAvY29udHJvbGxlcnMvbWVudS1jb250cm9sbGVyLnRzIiwiQXBwL2NvbnRyb2xsZXJzL3RvcGljcy1jb250cm9sbGVyLnRzIiwiQXBwL3JlcXVlc3QtcmVzcG9uc2UtaGFuZGxlci50cyIsIkFwcC9yb290LW1hbmFnZXIudHMiLCJBcHAvc2VydmljZS90b3BpY3Mtc2VydmljZS50cyIsIkFwcC9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQyx5QkFBMkIsWUFBWSxDQUFDLENBQUE7QUFFekMseUNBQW9DLDRCQUE0QixDQUFDLENBQUE7QUFDakUsUUFBTyxZQUFZLENBQUMsQ0FBQTtBQUNwQixRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFDeEIsUUFBTyxnQ0FDUCxDQUFDLENBRHNDO0FBQ3ZDLFFBQU8saUNBQ1AsQ0FBQyxDQUR1QztBQUN4QyxRQUFPLCtCQUVQLENBQUMsQ0FGcUM7QUFFdEMsSUFBSSxXQUFXLEdBQUcsVUFDZCxjQUF5QyxFQUN6QyxrQkFBaUQ7SUFDakQsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQUksdUJBQWMsQ0FBQyxDQUFDO0lBRWpELGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDakIsUUFBUSxFQUFFLElBQUk7UUFDZCxJQUFJLEVBQUUsV0FBVztRQUNqQixLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsV0FBVyxFQUFFLGlCQUFpQjthQUNqQztTQUNKO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUcsVUFBQyxhQUErQjtJQUM3QyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnREFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUM7QUFFRixJQUFJLFdB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LElBQUksRUFBRSwwQ0FBMEM7Z0JBQ2hELFdBQVcsRUFBRSwwSkFBMEo7Z0JBQ3ZLLElBQUksRUFBRSxvQ0FBb0M7YUFDN0M7WUFDRDtnQkFDSSxJQUFJLEVBQUUsMENBQTBDO2dCQUNoRCxXQUFXLEVBQUUsMEpBQTBKO2dCQUN2SyxJQUFJLEVBQUUsb0NBQW9DO2FBQzdDO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLDBDQUEwQztnQkFDaEQsV0FBVyxFQUFFLDBKQUEwSjtnQkFDdkssSUFBSSxFQUFFLG9DQUFvQzthQUM3QztZQUNEO2dCQUNJLElBQUksRUFBRSwwQ0FBMEM7Z0JBQ2hELFdBQVcsRUFBRSwwSkFBMEo7Z0JBQ3ZLLElBQUksRUFBRSxvQ0FBb0M7YUFDN0M7WUFDRDtnQkFDSSxJQUFJLEVBQUUsMENBQTBDO2dCQUNoRCxXQUFXLEVBQUUsMEpBQTBKO2dCQUN2SyxJQUFJLEVBQUUsb0NBQW9DO2FBQzdDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFDRCxpQ0FBUyxHQUFUO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FsQ0EsQUFrQ0MsSUFBQTtBQWxDWSxxQkFBYSxnQkFrQ3pCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLENBQUM7OztBQ3RDNUQsb0JBQVksR0FBRyxPQUFPLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwi77u/aW1wb3J0IHtkZWZhdWx0U3RhdGV9IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcbmltcG9ydCB7Um9vdE1hbmFnZXJ9IGZyb20gXCIuL3Jvb3QtbWFuYWdlclwiO1xyXG5pbXBvcnQge0N1c3RvbUh0dHBJbnRlcmNlcHRvcn0gZnJvbSBcIi4vcmVxdWVzdC1yZXNwb25zZS1oYW5kbGVyXCI7XHJcbmltcG9ydCBcIi4vc2V0dGluZ3NcIjtcclxuaW1wb3J0IFwiLi9yb290LW1hbmFnZXJcIjtcclxuaW1wb3J0IFwiLi9jb250cm9sbGVycy9sb2dpbi1jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi9jb250cm9sbGVycy90b3BpY3MtY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vY29udHJvbGxlcnMvbWVudS1jb250cm9sbGVyXCJcclxuXHJcbmxldCBzdGF0ZUNvbmZpZyA9IChcclxuICAgICRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyLFxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyOiBhbmd1bGFyLnVpLklVcmxSb3V0ZXJQcm92aWRlcik6IHZvaWQgPT4ge1xyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShgLyR7ZGVmYXVsdFN0YXRlfWApO1xyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKHtcclxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICBuYW1lOiBcImJhc2UtbWVudVwiLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIlNoYXJlZC9CYXNlTWVudVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmxldCBodHRwQ29uZmlnID0gKCRodHRwUHJvdmlkZXI6IG5nLklIdHRwUHJvdmlkZXIpID0+IHtcclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goQ3VzdG9tSHR0cEludGVyY2VwdG9yLmZhY3RvcnkpO1xyXG59O1xyXG5cclxubGV0IHRoZW1lQ29uZmlnID0gKCRtZFRoZW1pbmdQcm92aWRlcjogYW5ndWxhci5tYXRlcmlhbC5JVGhlbWluZ1Byb3ZpZGVyKSA9PiB7XHJcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxyXG4gICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncGluaycpXHJcbiAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpO1xyXG59O1xyXG5cclxubGV0IG9uU3RhcnQgPSAoJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIHJvb3RNYW5hZ2VyOiBSb290TWFuYWdlcikgPT4ge1xyXG4gICAgcm9vdE1hbmFnZXIuaGlkZUxvYWRTY3JlZW4oKTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN0YXJ0XCIsIChldmVudCwgdG9TdGF0ZSwgdG9QYXJhbXMsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykgPT4ge1xyXG4gICAgICAgIHJvb3RNYW5hZ2VyLnNob3dMb2FkU2NyZWVuKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbihcIiRzdGF0ZUNoYW5nZVN1Y2Nlc3NcIiwgKCkgPT4ge1xyXG4gICAgICAgIHJvb3RNYW5hZ2VyLmhpZGVMb2FkU2NyZWVuKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnN0YXRlQ29uZmlnLiRpbmplY3QgPSBbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiXTtcclxub25TdGFydC4kaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiLCBcInJvb3RNYW5hZ2VyXCJdO1xyXG50aGVtZUNvbmZpZy4kaW5qZWN0ID0gW1wiJG1kVGhlbWluZ1Byb3ZpZGVyXCJdO1xyXG5cclxuYW5ndWxhclxyXG4gICAgLm1vZHVsZShcImFwcFwiLCBbXCJhcHAtY29tbW9uXCIsICduZ01hdGVyaWFsJywgJ3VpLnJvdXRlcicsIFwibmdTYW5pdGl6ZVwiLCBcImFwcC51c2VyXCIsIFwiYXBwLnRvcGljc1wiLCBcImFwcC5tZW51XCIsICd1aS50aW55bWNlJ10pXHJcbiAgICAuY29uZmlnKGh0dHBDb25maWcpXHJcbiAgICAuY29uZmlnKHN0YXRlQ29uZmlnKVxyXG4gICAgLmNvbmZpZyh0aGVtZUNvbmZpZylcclxuICAgIC5ydW4ob25TdGFydCk7XHJcbiIsIu+7v2xldCBzdGF0ZUNvbmZpZyA9ICgkc3RhdGVQcm92aWRlcjogYW5ndWxhci51aS5JU3RhdGVQcm92aWRlcikgPT4ge1xyXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoe1xyXG4gICAgICAgIGNvbnRyb2xsZXI6IFwibG9naW4tY29udHJvbGxlciBhcyBjdHJsXCIsXHJcbiAgICAgICAgbmFtZTogXCJsb2dpblwiLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiBcIkxvZ2luXCIsXHJcbiAgICAgICAgdXJsOiBcIi9sb2dpblwiXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNsYXNzIExvZ2luQ29udHJvbGxlciB7XHJcbiAgICBwdWJsaWMgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBwYXNzd29yZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbG9naW4oKSB7XHJcbiAgICAgICAgdGhpcy4kc3RhdGUuZ28oXCJ0b3BpY3NcIik7XHJcbiAgICB9XHJcbn1cclxuc3RhdGVDb25maWcuJGluamVjdCA9IFtcIiRzdGF0ZVByb3ZpZGVyXCJdO1xyXG5Mb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzdGF0ZVwiXTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKFwiYXBwLnVzZXJcIiwgW10pXHJcbiAgICAuY29udHJvbGxlcihcImxvZ2luLWNvbnRyb2xsZXJcIiwgTG9naW5Db250cm9sbGVyKVxyXG4gICAgLmNvbmZpZyhzdGF0ZUNvbmZpZyk7XHJcbiIsIu+7v2NsYXNzIE1lbnVDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5NZW51Q29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHN0YXRlXCJdO1xyXG5hbmd1bGFyLm1vZHVsZShcImFwcC5tZW51XCIsIFtdKS5jb250cm9sbGVyKFwibWVudS1jb250cm9sbGVyXCIsIE1lbnVDb250cm9sbGVyKTsiLCLvu79pbXBvcnQge1RvcGljc1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlL3RvcGljcy1zZXJ2aWNlXCJcclxuaW1wb3J0IHtUb3BpY30gZnJvbSBcIi4uL21vZGVscy90b3BpY1wiXHJcbmltcG9ydCBcIi4uL3NlcnZpY2UvdG9waWNzLXNlcnZpY2VcIlxyXG5cclxubGV0IHN0YXRlQ29uZmlnID0gKCRzdGF0ZVByb3ZpZGVyOiBhbmd1bGFyLnVpLklTdGF0ZVByb3ZpZGVyKSA9PiB7XHJcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSh7XHJcbiAgICAgICAgbmFtZTogXCJ0b3BpY3NcIixcclxuICAgICAgICB1cmw6IFwiL3RvcGljc1wiLFxyXG4gICAgICAgIHBhcmVudDogXCJiYXNlLW1lbnVcIixcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICBcIlwiOiB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcInRvcGljcy1jb250cm9sbGVyIGFzIGN0cmxcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIlRvcGljcy9JbmRleFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudUBiYXNlLW1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJtZW51LWNvbnRyb2xsZXIgYXMgY3RybFwiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiQ29tbW9uL01lbnVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jbGFzcyBUb3BpY3NDb250cm9sbGVyIHtcclxuICAgIHRpbnltY2VPcHRpb25zOiBhbnk7XHJcbiAgICB0aW55bWNlTW9kZWw6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9waWNzU2VydmljZTogVG9waWNzU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudGlueW1jZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBsdWdpbnM6ICdsaW5rIGltYWdlIGNvZGUnLFxyXG4gICAgICAgICAgICB0b29sYmFyOiAndW5kbyByZWRvIHwgYm9sZCBpdGFsaWMgfCBhbGlnbmxlZnQgYWxpZ25jZW50ZXIgYWxpZ25yaWdodCB8IGNvZGUnXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRpbnltY2VNb2RlbCA9ICdJbml0aWFsIGNvbnRlbnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0b3BpY3MoKTogQXJyYXk8VG9waWM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3BpY3NTZXJ2aWNlLmdldFRvcGljcygpO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuc3RhdGVDb25maWcuJGluamVjdCA9IFtcIiRzdGF0ZVByb3ZpZGVyXCJdO1xyXG5Ub3BpY3NDb250cm9sbGVyLiRpbmplY3QgPSBbXCJ0b3BpY3Mtc2VydmljZVwiXTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKFwiYXBwLnRvcGljc1wiKVxyXG4gICAgLmNvbnRyb2xsZXIoXCJ0b3BpY3MtY29udHJvbGxlclwiLCBUb3BpY3NDb250cm9sbGVyKVxyXG4gICAgLmNvbmZpZyhzdGF0ZUNvbmZpZyk7Iiwi77u/aW1wb3J0IHtSb290TWFuYWdlcn0gZnJvbSBcIi4vcm9vdC1tYW5hZ2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgbmcuSUh0dHBJbnRlcmNlcHRvciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoJHE6IG5nLklRU2VydmljZSwgcm9vdE1hbmFnZXI6IFJvb3RNYW5hZ2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b21IdHRwSW50ZXJjZXB0b3IoJHEsIHJvb3RNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRxOiBuZy5JUVNlcnZpY2UsIHByaXZhdGUgcm9vdE1hbmFnZXI6IFJvb3RNYW5hZ2VyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc3BvbnNlID0gPFQ+KHJlc3BvbnNlOiBuZy5JSHR0cFByb21pc2VDYWxsYmFja0FyZzxUPik6IG5nLklQcm9taXNlPFQ+ID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kcS53aGVuKHJlc3BvbnNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzcG9uc2VFcnJvciA9IChyZWplY3Rpb246IGFueSk6IG5nLklQcm9taXNlPGFueT4gPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgfVxyXG59Iiwi77u/ZXhwb3J0IGNsYXNzIFJvb3RNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0xvYWRTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY3JlZW5TdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUxvYWRTY3JlZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTY3JlZW5TdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VTY3JlZW5TdGF0ZShpc0xvYWRpbmc6IGJvb2xlYW4pIHtcclxuICAgICAgICAodGhpcy4kcm9vdFNjb3BlIGFzIGFueSkuc3RhdGVJc0xvYWRpbmcgPSBpc0xvYWRpbmc7XHJcbiAgICB9O1xyXG7vu799XHJcblxyXG5sZXQgcm9vdE1hbmFnZXJGYWN0b3J5ID0gKCRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlKTogUm9vdE1hbmFnZXIgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBSb290TWFuYWdlcigkcm9vdFNjb3BlKTtcclxufTtcclxuXHJcbu+7v3Jvb3RNYW5hZ2VyRmFjdG9yeS4kaW5qZWN0ID0gW1wiJHJvb3RTY29wZVwiXTtcclxuXHJcbu+7v2FuZ3VsYXJcclxuICAgIC5tb2R1bGUoXCJhcHAtY29tbW9uXCIsIFtdKVxyXG4gICAgLmZhY3RvcnkoXCJyb290TWFuYWdlclwiLCByb290TWFuYWdlckZhY3RvcnkpOyIsIu+7v2ltcG9ydCB7VG9waWN9IGZyb20gXCIuLi9tb2RlbHMvdG9waWNcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFRvcGljc1NlcnZpY2Uge1xyXG4gICAgdG9waWNzOiBBcnJheTxUb3BpYz47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRvcGljcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJMZWN0aW9uIDE6IEN1cmFiaXR1ciBhIHNjZWxlcmlzcXVlIHJpc3VzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBQcm9pbiBpbXBlcmRpZXQgc2NlbGVyaXNxdWUgbGFjdXMuIE1hdXJpcyBxdWlzIHNhZ2l0dGlzIG9yY2kuIFN1c3BlbmRpc3NlIGlwc3VtIG9kaW8sIHBoYXJldHJhLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCI8dWw+PGxpPnJlbmRlciBtZSBwbGVhc2U8L2xpPjwvdWw+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJMZWN0aW9uIDI6IEN1cmFiaXR1ciBhIHNjZWxlcmlzcXVlIHJpc3VzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBQcm9pbiBpbXBlcmRpZXQgc2NlbGVyaXNxdWUgbGFjdXMuIE1hdXJpcyBxdWlzIHNhZ2l0dGlzIG9yY2kuIFN1c3BlbmRpc3NlIGlwc3VtIG9kaW8sIHBoYXJldHJhLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCI8dWw+PGxpPnJlbmRlciBtZSBwbGVhc2U8L2xpPjwvdWw+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJMZWN0aW9uIDM6IEN1cmFiaXR1ciBhIHNjZWxlcmlzcXVlIHJpc3VzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBQcm9pbiBpbXBlcmRpZXQgc2NlbGVyaXNxdWUgbGFjdXMuIE1hdXJpcyBxdWlzIHNhZ2l0dGlzIG9yY2kuIFN1c3BlbmRpc3NlIGlwc3VtIG9kaW8sIHBoYXJldHJhLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCI8dWw+PGxpPnJlbmRlciBtZSBwbGVhc2U8L2xpPjwvdWw+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJMZWN0aW9uIDQ6IEN1cmFiaXR1ciBhIHNjZWxlcmlzcXVlIHJpc3VzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBQcm9pbiBpbXBlcmRpZXQgc2NlbGVyaXNxdWUgbGFjdXMuIE1hdXJpcyBxdWlzIHNhZ2l0dGlzIG9yY2kuIFN1c3BlbmRpc3NlIGlwc3VtIG9kaW8sIHBoYXJldHJhLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCI8dWw+PGxpPnJlbmRlciBtZSBwbGVhc2U8L2xpPjwvdWw+XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJMZWN0aW9uIDU6IEN1cmFiaXR1ciBhIHNjZWxlcmlzcXVlIHJpc3VzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBQcm9pbiBpbXBlcmRpZXQgc2NlbGVyaXNxdWUgbGFjdXMuIE1hdXJpcyBxdWlzIHNhZ2l0dGlzIG9yY2kuIFN1c3BlbmRpc3NlIGlwc3VtIG9kaW8sIHBoYXJldHJhLlwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogXCI8dWw+PGxpPnJlbmRlciBtZSBwbGVhc2U8L2xpPjwvdWw+XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICBnZXRUb3BpY3MoKTogQXJyYXk8VG9waWM+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b3BpY3M7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKFwiYXBwLnRvcGljc1wiLCBbXSkuc2VydmljZShcInRvcGljcy1zZXJ2aWNlXCIsIFRvcGljc1NlcnZpY2UpOyIsIu+7v2V4cG9ydCBjb25zdCBkZWZhdWx0U3RhdGUgPSBcImxvZ2luXCI7Il19
