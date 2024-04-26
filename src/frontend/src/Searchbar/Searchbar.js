import React, { useEffect , useState} from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/autocomplete';
import 'jquery-ui/themes/base/theme.css';
import './Searchbar.css';

const SearchBar2 = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
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
                            response(data[1]);
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

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        
    };      
    const handleSubmit = (e) => {
        e.preventDefault();
        // setResults(input);
        // 
        axios.post('http://localhost:8000/inputstart', { input: input })
        .then(() => {
            console.log('input start sent to backend:', input);
        })
        .catch((error) => {
            console.error('Error sending data to backend:', error);
        });
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setSuggestions([]);
        setResults(suggestion);
    };
    return (
        <div className="search-section">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                className="search-bar searchClass"
                placeholder="Search..."
                value={input}
                onChange={handleInputChange}
                />
                <button type="submit" className="go-button">
                Go
                </button>
            </form>
            <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar2;
