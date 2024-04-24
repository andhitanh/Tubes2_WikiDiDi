import React, {useState} from 'react';
import './Searchbar.css'; // Import file CSS untuk styling SearchBar
import axios from 'axios'; // Import axios untuk melakukan HTTP request
const SearchBar = ({setResults}) => {
  const [input, setInput] = useState('');
  const fetchData =  (value)=>{
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response)=>response.json())
    .then((json)=>{
      const results = json.filter((user)=>{
        return value && user && user.name.toLowerCase().includes(value);
      });
      setResults(results);
    })
  }

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
    fetchData(value);
  }
  return (
    <div className="search-section">
      <input 
      type="text" 
      className="search-bar" 
      placeholder="Search..." 
      value={input} 
      onChange={(e) => handleChanges(e.target.value)}
      />
    </div>
  );
}
export default SearchBar;