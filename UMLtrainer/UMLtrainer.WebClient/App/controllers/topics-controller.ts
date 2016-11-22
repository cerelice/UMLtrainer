import {TopicsService} from "../service/topics-service"
import {Topic} from "../models/topic"
import "../service/topics-service"

let stateConfig = ($stateProvider: angular.ui.IStateProvider) => {
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

class TopicsController {
    tinymceOptions: any;
    tinymceModel: string;
    constructor(private topicsService: TopicsService) {
        this.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        };
        this.tinymceModel = 'Initial content';
    }

    get topics(): Array<Topic> {
        return this.topicsService.getTopics();
    }


}
stateConfig.$inject = ["$stateProvider"];
TopicsController.$inject = ["topics-service"];

angular.module("app.topics")
    .controller("topics-controller", TopicsController)
    .config(stateConfig);