import React from "react";
import Graph from "react-graph-vis";

function Draw({ result, history }) {
    if (!result || !result.path || !Array.isArray(result.path)) {
        return null;
    }

    const nodes = {};
    const connections = [];
    const usedIds = new Set(); // Gunakan Set untuk menyimpan ID yang sudah digunakan

    result.path.forEach((solution, solutionIndex) => {
        solution.forEach((article, index) => {
            const fromNode = `${article.replace(/ /g, "_")}_${solutionIndex}_${index}`;

            // Periksa apakah ID sudah digunakan sebelumnya
            if (usedIds.has(fromNode)) {
                console.error(`Duplicate ID found: ${fromNode}`);
            }

            nodes[fromNode] = { id: fromNode, label: article };
            usedIds.add(fromNode); // Tambahkan ID ke Set

            if (index < solution.length - 1) {
                const toNode = `${solution[index + 1].replace(/ /g, "_")}_${solutionIndex}_${index + 1}`;
                
                // Periksa apakah ID sudah digunakan sebelumnya
                if (usedIds.has(toNode)) {
                    console.error(`Duplicate ID found: ${toNode}`);
                }

                connections.push({ from: fromNode, to: toNode });
                usedIds.add(toNode); // Tambahkan ID ke Set
            }
        });
    });

    const graph = {
        nodes: Object.values(nodes),
        edges: connections,
    };

    const options = {
        layout: { hierarchical: false },
        height: "150px",
        width: "500px",
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
    };

    return <Graph key={JSON.stringify(result)} graph={graph} options={options} events={events} />;
}

export default Draw;
