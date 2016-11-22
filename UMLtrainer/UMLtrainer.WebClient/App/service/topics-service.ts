import {Topic} from "../models/topic"

export class TopicsService {
    topics: Array<Topic>;
    constructor() {
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
    getTopics(): Array<Topic> {
        return this.topics;
    }
}

angular.module("app.topics", []).service("topics-service", TopicsService);