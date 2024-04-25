import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './Ids.css';

const BfsTest = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (result && Array.isArray(result)) {
        drawGraph();
    }
}, [result]);

  const drawGraph = () => {
    const width = 800;
    const height = 400;

    const svg = d3.select('#graph-container').selectAll('*').remove()// Remove previous graph elements
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    if (!result) return;

    const nodes = result.map((article, index) => ({ id: index, name: article }));
    const links = result.slice(1).map((article, index) => ({ source: index, target: index + 1 }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line');

    const node = svg.append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', '#000');

    // Tambahkan label nama pada setiap node
    node.append('title')
      .text(d => d.name);

    // Tambahkan teks nama pada setiap node
    svg.append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('x', d => d.x + 10)
      .attr('y', d => d.y)
      .text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
  };

  const handleBfsRequest = async () => {
    // const testPathData = [
    // //   ["Rurtalbahn GmbH", "DB_Bahn", "Melati", "Andhita"],
    //   ["Lars Vogt", "Bach_Cantatas", "Andhita"]
    // ];
    
    try {
        const response = await fetch('http://localhost:8000/ids');
        const result = await response.json();
        setResult(result);
        setHistory(prev => {
        const updatedHistory = [result, ...prev]; // Tambahkan permintaan BFS terbaru ke awal array
        return updatedHistory.slice(0, 3); // Potong array agar memiliki maksimal 3 elemen
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='graph' >
        <button className='button-bfs' onClick={handleBfsRequest}>GO IDS</button>
        {history.length > 0 && (
          <li>{JSON.stringify(history[0])}</li>
        )}
        <h3>Recent IDS Requests</h3>
        <ul>
            {history.slice(1).map((path, index) => (
            <li key={index}>{JSON.stringify(path)}</li>
            // <li key={index}>{path.join(' -> ').replace(/,/g, ' -> ')}</li>
            ))}
            
        </ul>
    </div>
  );
};

export default BfsTest;
