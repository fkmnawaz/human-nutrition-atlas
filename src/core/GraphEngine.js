/**********************************************************************
 * Human Nutrition Atlas
 *
 * GraphEngine
 *
 * Wrapper around Cytoscape
 *
 * Version : 0.1.1
 *********************************************************************/
import { EventBus } from "../core/EventBus";
import { InteractionManager } from "./InteractionManager";
import { StyleBuilder } from "./StyleBuilder";
import { LayoutManager } from "./LayoutManager";
import { NodeColors, EdgeColors } from "./ColorPalette";
import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";

cytoscape.use(fcose);

export class GraphEngine {

    constructor(containerId) {

        this.containerId = containerId;

        this.cy = null;

        this.styleBuilder = new StyleBuilder("light");

        this.nodes = [];

        this.edges = [];

        this.selectedNode = null;

        this.eventHandlers = {
            nodeSelected: [],
            edgeSelected: [],
            graphReady: []
        };

        this.bus = new EventBus();

        this.interactionManager = null;

    }

    /**
     * Initialize Cytoscape
     */
    initialize() {

        this.cy = cytoscape({

            container: document.getElementById(this.containerId),

            elements: [],

            style: this.styleBuilder.build(),

            wheelSensitivity: 0.20,

            minZoom: 0.20,

            maxZoom: 5,

            layout: {
                name: "fcose",
                animate: false
            }

        });

        this.interactionManager =
            new InteractionManager(
                this.cy,
                this.bus
            );

        this.interactionManager.initialize();

        this.layoutManager = new LayoutManager(this.cy);

        this.bus.publish("graphReady", this.cy);

    }

    setTheme(theme) {

        this.styleBuilder.setTheme(theme);

        this.cy.style(
            this.styleBuilder.build()
        );

    }

    /**
     * Load graph
     */
    load(graph) {

        this.graph = graph;

        this.cy.elements().remove();

        this.cy.add(
            graph.toCyElements()
        );

        this.layoutManager.run("fcose");

    }
    /*load(nodes, edges) {

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

    }*/

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
    /*on(event, callback) {

        if (!this.eventHandlers[event])
            return;

        this.eventHandlers[event].push(callback);

    }*/
    subscribe(event, callback) {

        this.bus.subscribe(event, callback);

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



}