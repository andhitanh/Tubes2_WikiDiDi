import React, {useState} from 'react';
import './Searchbar.css'; // Import file CSS untuk styling SearchBar
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