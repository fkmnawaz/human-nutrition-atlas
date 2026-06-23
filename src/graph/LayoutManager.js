/**********************************************************************
 * Human Nutrition Atlas
 * Layout Manager
 *********************************************************************/

export class LayoutManager {

    constructor(cy) {

        this.cy = cy;

    }

    run(layoutName = "fcose") {

        const layouts = {

            fcose: {

                name: "fcose",

                animate: true,

                fit: true,

                padding: 80,

                nodeRepulsion: 900000,

                idealEdgeLength: 180,

                edgeElasticity: 0.4,

                gravity: 0.25

            },

            grid: {

                name: "grid",

                fit: true,

                padding: 60

            },

            circle: {

                name: "circle",

                fit: true,

                padding: 80

            },

            concentric: {

                name: "concentric",

                fit: true,

                padding: 80,

                concentric(node) {

                    return node.degree();

                },

                levelWidth() {

                    return 2;

                }

            },

            breadthfirst: {

                name: "breadthfirst",

                directed: true,

                spacingFactor: 1.6,

                fit: true,

                padding: 80

            }

        };

        const config = layouts[layoutName] || layouts.fcose;

        this.cy.layout(config).run();

    }

    availableLayouts() {

        return [

            {
                id: "fcose",
                label: "Organic"
            },

            {
                id: "grid",
                label: "Grid"
            },

            {
                id: "circle",
                label: "Circle"
            },

            {
                id: "concentric",
                label: "Concentric"
            },

            {
                id: "breadthfirst",
                label: "Hierarchy"
            }

        ];

    }

}