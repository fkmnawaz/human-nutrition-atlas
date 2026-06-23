/**********************************************************************
 * Human Nutrition Atlas
 * Style Builder
 *********************************************************************/

import { NodeColors, EdgeColors, Theme } from "./ColorPalette";

export class StyleBuilder {

    constructor(theme = "light") {
        this.theme = theme;
    }

    setTheme(theme) {
        this.theme = theme;
    }

    build() {

        const currentTheme = Theme[this.theme];

        const styles = [];

        // ---------- Default Nodes ----------

        styles.push({

            selector: "node",

            style: {

                label: "data(name)",

                width: 55,

                height: 55,

                color: currentTheme.text,

                "font-size": 13,

                "font-weight": "600",

                "text-wrap": "wrap",

                "text-max-width": 90,

                "text-valign": "bottom",

                "text-margin-y": 8,

                "border-width": 2,

                "border-color": "#ffffff",

                "background-color": "#90CAF9"

            }

        });

        // ---------- Node Categories ----------

        Object.entries(NodeColors).forEach(([type, color]) => {

            styles.push({

                selector: `node[type="${type}"]`,

                style: {

                    "background-color": color

                }

            });

        });

        // ---------- Default Edge ----------

        styles.push({

            selector: "edge",

            style: {

                width: 2,

                label: "data(relation)",

                "font-size": 9,

                "curve-style": "bezier",

                "target-arrow-shape": "triangle",

                "line-color": EdgeColors.default,

                "target-arrow-color": EdgeColors.default,

                "text-background-color": currentTheme.background,

                "text-background-opacity": 0.8,

                "text-background-padding": 2

            }

        });

        // ---------- Relationship Colors ----------

        Object.entries(EdgeColors).forEach(([relation, color]) => {

            if (relation === "default") return;

            styles.push({

                selector: `edge[relation="${relation}"]`,

                style: {

                    "line-color": color,

                    "target-arrow-color": color

                }

            });

        });

        // ---------- Selected ----------

        styles.push({

            selector: ".highlight",

            style: {

                opacity: 1,

                "border-width": 4,

                "border-color": "#FF9800",

                "line-color": "#FF9800",

                "target-arrow-color": "#FF9800"

            }

        });

        // ---------- Faded ----------

        styles.push({

            selector: ".faded",

            style: {

                opacity: currentTheme.faded

            }

        });

        return styles;

    }

}