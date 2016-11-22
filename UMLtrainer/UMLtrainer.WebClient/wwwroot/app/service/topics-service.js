"use strict";
var TopicsService = (function () {
    function TopicsService() {
        this.topics = [
            {
                name: "lection1",
                description: "lection1 description",
                data: "<ul><li>render me please</li></ul>"
            },
            {
                name: "lection2",
                description: "lection2 description",
                data: "lection2 data"
            },
            {
                name: "lection3",
                description: "lection3 description",
                data: "lection3 data"
            },
            {
                name: "lection1",
                description: "lection1 description",
                data: "lection1 data"
            },
            {
                name: "lection2",
                description: "lection2 description",
                data: "lection2 data"
            },
            {
                name: "lection3",
                description: "lection3 description",
                data: "lection3 data"
            },
            {
                name: "lection2",
                description: "lection2 description",
                data: "lection2 data"
            },
            {
                name: "lection3",
                description: "lection3 description",
                data: "lection3 data"
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
//# sourceMappingURL=topics-service.js.map