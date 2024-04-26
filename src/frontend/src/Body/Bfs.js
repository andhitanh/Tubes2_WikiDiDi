import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';
import './Bfs.css';

const BfsTest = () => {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (result && result.path && Array.isArray(result.path)) {
        drawGraph();
    }
  }, [result]);

  const drawGraph = () => {
    const width =400;
    const height = 100;

    d3.select('#graph-container').selectAll('*').remove();
    const svg = d3.select('#graph-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    if (!result || result.path.length < 2) return; // Periksa apakah hasil BFS tersedia dan memiliki setidaknya dua node
    console.log(result.path[0]);
    const nodes = result.path.map((article, index) => ({ id: index, name: article }));
    console.log(nodes);
    const links = result.path.slice(1).map((article, index) => ({ source: index, target: index + 1 }));
    console.log(links);
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width/2 , height /2));

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
      .join('text')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .text(d => d.name)
      .attr('r', 5)
      .attr('fill', '#000');

    // // // Tambahkan label nama pada setiap node
    // node.append('title')
    //   .text(d => d.name);
    // // Tambahkan teks nama pada setiap node
    // svg.append('g')
    //   .selectAll('text')
    //   .data(nodes)
    //   .join('text')
    //   .attr('x', d => d.x + 10)
    //   .attr('y', d => d.y)
    //   .text(d => d.name);

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
        const response = await fetch('http://localhost:8000/bfs');
        const result = await response.json();
        console.log(result);
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
        <button className='button-bfs' onClick={handleBfsRequest}>GO BFS</button>
        {result && result.path && (
          <div id="graph-container" className="graph-content"></div>
        )}
        { result && result.path && history.length > 0 && (
          <div className=' graph-container'>
            <p>
              Found <strong>{history[0]["path"].length - 1}</strong> degrees of separation from{" "}
              <strong>{history[0]["path"][0]}</strong> to{" "}
              <strong>{history[0]["path"][history[0]["path"].length - 1]}</strong>{" "}that visited{" "}
              <strong>{history[0]["visited"]}</strong>{" "} links in{" "}
              <strong>{history[0]["duration"].toFixed(2)}</strong> seconds!
              <p></p>
              <div className='contain'>

                {history.length > 0 && (
                  <li>
                    {/* {history[0].path.join(' ->')} */}
                    <span>
                      {history[0].path.map((node, index) => (
                        <React.Fragment key={index}>
                          {node.replace(/_/g, ' ')}
                          {index < history[0].path.length - 1 && (
                          <>
                            &nbsp;
                            <FontAwesomeIcon icon={faLongArrowAltRight} style={{ fontSize: '0.8em' }} />
                            &nbsp; 
                          </>
                          )}
                        </React.Fragment>
                      ))}
                    </span>
                  </li>
                )}
              </div>
            </p>
          </div>
        )}
        <div className='recent-req'>

          <h3>Recent BFS Requests</h3>
          <ul>
              {history.slice(1).map((path, index) => (
              // <li key={index}>{JSON.stringify(path)}</li>
                <p>
                  Found <strong>{history[index]["path"].length - 1}</strong> degrees of separation from{" "}
                  <strong>{history[index]["path"][0]}</strong> to{" "}
                  <strong>{history[index]["path"][history[index]["path"].length - 1]}</strong> in{" "}
                  <strong>{history[index]["duration"].toFixed(2)}</strong> seconds!
                </p>
              // <li key={index}>{path.join(' -> ').replace(/,/g, ' -> ')}</li>
              ))}
              
          </ul>
        </div>
    </div>
  );
};

export default BfsTest;
