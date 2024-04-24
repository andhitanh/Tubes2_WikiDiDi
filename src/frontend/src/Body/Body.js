import React, {useState} from 'react';
import './Body.css'; // Import file CSS untuk styling Body
import SearchBar from '../Searchbar/Searchbar'; // Import SearchBar component
import SearchResultList from '../Searchbar/SearchResultList';
const Body = () => {
  const [results, setResults] = useState([]); // State untuk menyimpan hasil pencarian
  const [searchData, setSearchData] = useState([
    { id: 1, input: '', results: [] },
    { id: 2, input: '', results: [] }
  ]);

  const handleSearchChange = (id, input, results) => {
    setSearchData((prevSearchData) =>
      prevSearchData.map((item) =>
        item.id === id ? { ...item, input, results } : item
      )
    );
  };

  return (
    <div className="body-container">
        <div className="body-content">
          {searchData.map((searchItem, index) => (
              <React.Fragment key={searchItem.id}>
                <SearchBar
                  id={searchItem.id}
                  setResults={(results) =>
                    handleSearchChange(searchItem.id, searchItem.input, results)
                  }
                />
                <SearchResultList results={searchItem.results} />
                {index < searchData.length - 1 && <p>to</p>}
              </React.Fragment>
            ))}
            {/* <div className='sub-search'>
              <SearchBar setResults={setResults}/>
              <SearchResultList results={results}/>
            </div>
            <p>to</p>
            <div className='sub-search'>
              <SearchBar setResults={setResults}/>
              <SearchResultList results={results}/>
            </div> */}
        </div>
    </div>
  );
}

export default Body;