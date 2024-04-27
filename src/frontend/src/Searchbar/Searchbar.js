import React, { useEffect , useState} from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import 'jquery-ui/themes/base/theme.css';
import './Searchbar.css';
import Draw from './Draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import * as d3 from 'd3';

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [result, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [startPage, setStartPage] = useState('');
    const [targetPage, setTargetPage] = useState('');
    const [algorithm, setAlgorithm] = useState('BFS'); // State untuk menyimpan pilihan algoritma

    useEffect(() => {
        const initializeAutocomplete = () => {
            $(".searchClass").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: "http://en.wikipedia.org/w/api.php",
                        dataType: "jsonp",
                        data: {
                            action: "opensearch",
                            format: "json",
                            search: request.term,
                            namespace: 0,
                            limit: 8,
                        },
                        success: function (data) {
                            response(data);
                        },
                    });
                },
                select: function (event, ui) {
                    handleSuggestionClick(ui.item.value);
                }
            });
        };
        $(document).on('click', function(event) {
            if (!$(event.target).closest('.ui-autocomplete').length) {
                $('.searchClass').autocomplete('close');
            }
        });

        $(document).ready(() => {
            initializeAutocomplete();
        });
    }, []);

    const handleAlgorithmChange = (e) => {
        setAlgorithm(e.target.value); 
    };
  
    const handleSubmit  = async (e) => {
        e.preventDefault();
        const inputan = {startPage: startPage, targetPage: targetPage, algorithm: algorithm};

        fetch('http://localhost:8000/inputstart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputan),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            setResults(result);
            setHistory(prev => {
                const updatedHistory = [result, ...prev]; // Tambahkan permintaan BFS terbaru ke awal array
                return updatedHistory.slice(0, 3); // Potong array agar memiliki maksimal 3 elemen
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]);
        setResults(suggestion);
    };
    
    return (
        <div  className=' search-body'>
            <form className="search-section" onSubmit={handleSubmit}>
                <label className='search'>
                    <input
                        type="text"
                        className="search-bar searchClass"
                        placeholder="Search..."
                        required
                        value={startPage}
                        onChange={(e)=> setStartPage(e.target.value) }
                    />
                </label>
                <p className='to'>to</p>
                <label className='search'>
                    <input
                        type="text"
                        required
                        value={targetPage}
                        className="target"
                        placeholder="Search..."
                        onChange={(e)=> setTargetPage(e.target.value) }
                    />
                </label>
                <label>
                    <select className ="option-algo" value={algorithm} onChange={handleAlgorithmChange}>
                        <option value="BFS">BFS</option>
                        <option value="IDS">IDS</option>
                    </select>
                </label>
            </form>
            
            <div className='graph' >
                <button className='button-bfs' onClick={handleSubmit}>GO!!</button>
                {result && result.path && (
                    <Draw result={result} history={history} />
                )}
                {result && result.path && (
                <div id="graph-container" className="graph-content"></div>
                )}
                { result && result.path && history.length > 0 && (
                <div className=' graph-container'>
                    
                    <p>
                    <strong className='nama-algo'>{"["}{algorithm === 'BFS' ? 'BFS' : 'IDS'}{"] "} </strong>Found <strong>{history[0]["path"].length - 1}</strong> degrees of separation from{" "}                    <strong>{history[0]["path"][0]}</strong> to{" "}
                    <strong>{history[0]["path"][history[0]["path"].length - 1]}</strong>{" "}that visited{" "}
                    <strong>{history[0]["visited"]}</strong>{" "} links in{" "}
                    <strong>{history[0]["duration"].toFixed(2)}</strong> seconds!
                    <p></p>
                    <div className='contain'>

                        {history.length > 0 && (
                        <li>
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

                    <h3>Recent Requests</h3>
                    <ul>
                        {history.slice(1).map((path, index) => (
                            <p>
                            Found <strong>{history[index+1]["path"].length - 1}</strong> degrees of separation from{" "}                    <strong>{history[0]["path"][0]}</strong> to{" "}
                            <strong>{history[index+1]["path"][index]}</strong> to{" "}
                            <strong>{history[index+1]["path"][history[index]["path"].length - 1]}</strong> in{" "}
                            <strong>{history[index+1]["duration"].toFixed(2)}</strong> seconds!
                            </p>
                        // <li key={index}>{path.join(' -> ').replace(/,/g, ' -> ')}</li>
                        ))}
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
