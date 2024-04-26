import React, {useState, useEffect} from 'react';
import './Searchbar.css'; // Import file CSS untuk styling SearchBar
import axios from 'axios'; // Import axios untuk melakukan HTTP request
const SearchBar = ({setResults}) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  }, [input]);
  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${value}`
      );
      setSuggestions(response.data[1]);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSuggestionClick = (value) => {
    setInput(value);
    setResults([]);
    fetchSuggestions(value); // Refetch suggestions when a suggestion is clicked
  };
  // const fetchData =  (value)=>{
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //   .then((response)=>response.json())
  //   .then((json)=>{
  //     const results = json.filter((user)=>{
  //       return value && user && user.name.toLowerCase().includes(value);
  //     });
  //     setResults(results);
  //   })
  // }
   // jQuery autocomplete functionality
  //  $(document).ready(function () {
  //   $(".search-bar").autocomplete({
  //     source: function (request, response) {
  //       $.ajax({
  //         url: "http://en.wikipedia.org/w/api.php",
  //         dataType: "jsonp",
  //         data: {
  //           action: "opensearch",
  //           format: "json",
  //           search: request.term,
  //           namespace: 0,
  //           limit: 8,
  //         },
  //         success: function (data) {
  //           response(data[1]);
  //         },
  //       });
  //     },
  //   });
  // });
  // const fetchData = async (value) => {
  //   try {
  //     // Fetch data from Wikipedia API
  //     const response = await axios.get(
  //       `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${value}`
  //     );
  //     // Extract search results from the response
  //     const searchResults = response.data.query.search;
  //     // Set search results in state
  //     setResults(searchResults);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };
  

  // masih error gais
  // const fetchData = async (value) => {
  //   try {
  //     // Fetch data from Wikipedia API
  //     const response = await axios.get(
  //       `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${value}`
  //     );
  //     // Extract search results from the response
  //     const searchResults = response.data.query.search;
  //     // Set search results in state
  //     setResults(searchResults);
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };

  const handleChanges = (value) => {
    setInput(value);
    // fetchData(value);
  }
  return (
    <div className="search-section">
      {/* <input 
      type="text" 
      className="search-bar" 
      placeholder="Search..." 
      value={input} 
      onChange={(e) => handleChanges(e.target.value)}
      /> */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={input}
        onChange={handleInputChange}
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SearchBar;