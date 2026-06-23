import { NodeType } from "./NodeType";

export class GraphNode {

    constructor(data) {

        this.id = data.id;

        this.name = data.name;

        this.type = data.type || NodeType.Vitamin;

        this.aliases = data.aliases || [];

        this.description = data.description || "";

        this.functions = data.functions || [];

        this.foodSources = data.foodSources || [];

        this.references = data.references || [];

        this.tags = data.tags || [];

        this.metadata = data.metadata || {};

    }

    toCy() {

        return {

            group: "nodes",

            data: {

                id: this.id,

                name: this.name,

                type: this.type

            }

        };

    }

}