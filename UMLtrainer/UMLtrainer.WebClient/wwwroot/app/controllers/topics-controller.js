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
//# sourceMappingURL=topics-controller.js.map