import React, { useEffect, useState } from "react";
import "./Draw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import * as d3 from "d3";

const Draw = ({ result, history }) => {
  useEffect(() => {
    if (result && result.path && Array.isArray(result.path)) {
      drawGraph();
    }
  }, [result]);

  const drawGraph = () => {
    // Logika untuk menggambar graf
    if (!result || !result.path || result.path.length < 2) return;

    const width = 400;
    const height = 100;

    d3.select("#graph-container").selectAll("*").remove();
    const svg = d3
      .select("#graph-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const nodes = result.path.map((article, index) => ({
      id: index,
      name: article,
    }));
    const links = result.path.slice(1).map((article, index) => ({
      source: index,
      target: index + 1,
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .join("text")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .text((d) => d.name)
      .attr("r", 5)
      .attr("fill", "#000");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  };

  return (
    <div className="body-graph">
    </div>
  );
};

export default Draw;
