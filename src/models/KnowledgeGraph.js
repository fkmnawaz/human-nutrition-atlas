import { GraphNode } from "./GraphNode";
import { GraphEdge } from "./GraphEdge";

export class KnowledgeGraph {

    constructor() {

        this.nodes = [];

        this.edges = [];

    }

    addNode(node) {

        this.nodes.push(
            new GraphNode(node)
        );

    }

    addEdge(edge) {

        this.edges.push(
            new GraphEdge(edge)
        );

    }

    getNode(id) {

        return this.nodes.find(
            n => n.id === id
        );

    }

    toCyElements() {

        return [

            ...this.nodes.map(
                n => n.toCy()
            ),

            ...this.edges.map(
                e => e.toCy()
            )

        ];

    }

}