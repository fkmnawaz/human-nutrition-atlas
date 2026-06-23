export class GraphEdge {

    constructor(data) {

        this.id =
            data.id ||
            `${data.source}_${data.target}`;

        this.source = data.source;

        this.target = data.target;

        this.relation = data.relation;

        this.weight = data.weight || 1;

        this.references = data.references || [];

        this.metadata = data.metadata || {};

    }

    toCy() {

        return {

            group: "edges",

            data: {

                id: this.id,

                source: this.source,

                target: this.target,

                relation: this.relation,

                weight: this.weight

            }

        };

    }

}