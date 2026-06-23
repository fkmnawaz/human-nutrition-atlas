/**********************************************************************
 * Human Nutrition Atlas
 * Interaction Manager
 *********************************************************************/

export class InteractionManager {

    constructor(cy, eventBus) {

        this.cy = cy;
        this.bus = eventBus;

    }

    initialize() {

        this.registerNodeSelection();
        this.registerEdgeSelection();
        this.registerCanvasClick();
        this.registerHover();

    }

    registerNodeSelection() {

        this.cy.on("tap", "node", evt => {

            const node = evt.target;

            this.bus.publish("node:selected", node.data());

        });

    }

    registerEdgeSelection() {

        this.cy.on("tap", "edge", evt => {

            this.bus.publish("edge:selected", evt.target.data());

        });

    }

    registerCanvasClick() {

        this.cy.on("tap", evt => {

            if (evt.target === this.cy) {

                this.bus.publish("selection:clear");

            }

        });

    }

    registerHover() {

        this.cy.on("mouseover", "node", evt => {

            this.bus.publish("node:hover", evt.target.data());

        });

    }

}