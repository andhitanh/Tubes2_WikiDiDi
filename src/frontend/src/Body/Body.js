import React, {useState} from 'react';
import './Body.css'; // Import file CSS untuk styling Body
import SearchBar from '../Searchbar/Searchbar'; // Import SearchBar component
import SearchBar2 from '../Searchbar/SearchBar2';
import SearchResultList from '../Searchbar/SearchResultList';
import Bfs from './Bfs';
import Ids from './Ids';

const Body = () => {
  const [results, setResults] = useState([]);
  const [searchData, setSearchData] = useState([
    { id: 1, input: '', results: [] },
    { id: 2, input: '', results: [] }
  ]);

  const [searchAlgorithm, setSearchAlgorithm] = useState('bfs');

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
          <SearchBar />
        </div>
    </div>
  );
}

export default Body;