/**********************************************************************
 * Human Nutrition Atlas
 *
 * GraphEngine
 *
 * Wrapper around Cytoscape
 *
 * Version : 0.1.1
 *********************************************************************/

import { LayoutManager } from "./LayoutManager";
import { NodeColors, EdgeColors } from "./ColorPalette";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

export class GraphEngine {

    constructor(containerId) {

        this.containerId = containerId;

        this.cy = null;

        this.nodes = [];

        this.edges = [];

        this.selectedNode = null;

        this.eventHandlers = {
            nodeSelected: [],
            edgeSelected: [],
            graphReady: []
        };

    }

    /**
     * Initialize Cytoscape
     */
    initialize() {

        this.cy = cytoscape({

            container: document.getElementById(this.containerId),

            elements: [],

            style: this.defaultStyles(),

            wheelSensitivity: 0.20,

            minZoom: 0.20,

            maxZoom: 5,

            layout: {
                name: "fcose",
                animate: false
            }

        });
        this.layoutManager = new LayoutManager(this.cy);
        this.registerEvents();

        this.fire("graphReady", this.cy);

    }

    /**
     * Load graph
     */
    load(nodes, edges) {

        this.nodes = nodes;
        this.edges = edges;

        this.cy.elements().remove();

        const elements = [];

        nodes.forEach(node => {

            elements.push({

                group: "nodes",

                data: node

            });

        });

        edges.forEach(edge => {

            elements.push({

                group: "edges",

                data: edge

            });

        });

        this.cy.add(elements);

        this.layoutManager.run("fcose");

    }

    /**
     * Execute layout
     */
    runLayout(name = "fcose") {

        this.cy.layout({

            name,

            animate: true,

            fit: true,

            padding: 80

        }).run();

    }

    /**
     * Register listeners
     */
    registerEvents() {

        this.cy.on("tap", "node", evt => {

            const node = evt.target;

            this.selectedNode = node;

            this.highlightNode(node.id());

            this.fire("nodeSelected", node.data());

        });

        this.cy.on("tap", "edge", evt => {

            this.fire("edgeSelected", evt.target.data());

        });

        this.cy.on("tap", evt => {

            if (evt.target === this.cy) {

                this.clearSelection();

            }

        });

    }

    /**
     * Highlight one node and neighbors
     */
    highlightNode(id) {

        this.cy.elements().removeClass("faded");

        this.cy.elements().removeClass("highlight");

        const node = this.cy.getElementById(id);

        node.addClass("highlight");

        node.connectedEdges().addClass("highlight");

        node.neighborhood().addClass("highlight");

        this.cy.elements().difference(node.closedNeighborhood())
            .addClass("faded");

    }

    /**
     * Clear selection
     */
    clearSelection() {

        this.selectedNode = null;

        this.cy.elements().removeClass("highlight");

        this.cy.elements().removeClass("faded");

    }

    /**
     * Zoom to node
     */
    zoomTo(id) {

        const node = this.cy.getElementById(id);

        if (node.empty()) return;

        this.cy.animate({

            fit: {

                eles: node.closedNeighborhood(),

                padding: 120

            },

            duration: 600

        });

    }

    /**
     * Register event
     */
    on(event, callback) {

        if (!this.eventHandlers[event])
            return;

        this.eventHandlers[event].push(callback);

    }

    /**
     * Fire event
     */
    fire(event, payload) {

        if (!this.eventHandlers[event])
            return;

        this.eventHandlers[event]
            .forEach(fn => fn(payload));

    }

    /**
     * Styles
     */
    defaultStyles() {

        return [

            {
                selector: "node",

                style: {

                    label: "data(name)",

                    width: 55,

                    height: 55,

                    "font-size": 13,

                    "font-weight": "bold",

                    "text-wrap": "wrap",

                    "text-max-width": "90px",

                    "text-valign": "bottom",

                    "text-margin-y": 8,

                    "background-color": "#5b8def",

                    color: "#222"

                }

            },

            {
                selector: 'node[type="Vitamin"]',

                style: {

                    "background-color": NodeColors.Vitamin

                }

            },

            {
                selector: 'node[type="Mineral"]',

                style: {

                    "background-color": NodeColors.Mineral

                }

            },

            {
                selector: 'node[type="Organ"]',

                style: {

                    "background-color": NodeColors.Organ

                }

            },

            {
                selector: 'node[type="Hormone"]',

                style: {

                    "background-color": NodeColors.Hormone

                }

            },

            {
                selector: "edge",

                style: {

                    width: 2,

                    label: "data(relation)",

                    "font-size": 10,

                    "curve-style": "bezier",

                    "target-arrow-shape": "triangle",

                    "line-color": EdgeColors.default,

                    "target-arrow-color": EdgeColors.default

                }

            },

            {
                selector: ".highlight",

                style: {

                    "border-width": 4,

                    "border-color": "#ff5722",

                    "line-color": "#ff5722",

                    "target-arrow-color": "#ff5722",

                    opacity: 1

                }

            },

            {
                selector: ".faded",

                style: {

                    opacity: 0.15

                }

            }

        ];

    }

}