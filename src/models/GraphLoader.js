import { KnowledgeGraph } from "../models/KnowledgeGraph";

export class GraphLoader {

    static fromJson(data) {

        const graph =
            new KnowledgeGraph();

        data.nodes.forEach(node =>
            graph.addNode(node)
        );

        data.edges.forEach(edge =>
            graph.addEdge(edge)
        );

        return graph;

    }

}