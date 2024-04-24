import React, {useState} from 'react';
import './Body.css'; // Import file CSS untuk styling Body
import SearchBar from '../Searchbar/Searchbar'; // Import SearchBar component
import SearchResultList from '../Searchbar/SearchResultList';
// import { breadthFirstSearch} from '../../../go-backend/bfsweb.go'; 
// import { iterativeDeepeningWikirace } from '../../../go-backend/test.go';

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

  const handleSwitchChange = () => {
    setSearchAlgorithm(searchAlgorithm === 'BFS' ? 'IDS' : 'BFS');
  };


  const handleGoButtonClick = () => {
    const maxDepth = 10;
    // Tentukan targetPage dari input SearchBar kanan (indeks 1)
    const targetPage = searchData[1].input;

    // Panggil fungsi pencarian yang sesuai berdasarkan jenis algoritma yang dipilih
    if (searchAlgorithm === 'BFS') {
      // Panggil fungsi BFS dengan startPage dari input SearchBar kiri (indeks 0) dan targetPage
      // breadthFirstSearch(searchData[0].input, targetPage);
    } else if (searchAlgorithm === 'IDS') {
      // Panggil fungsi IDS dengan startPage dari input SearchBar kiri (indeks 0) dan targetPage
      // iterativeDeepeningWikirace(searchData[0].input, targetPage, maxDepth);
    }
  };

  return (
    <div className="body-container">
        <div className="body-content">
          {searchData.map((searchItem, index) => (
            <React.Fragment key={searchItem.id}>
              <div className="sub-search">
                <SearchBar
                  id={searchItem.id}
                  setResults={(results) =>
                    handleSearchChange(searchItem.id, searchItem.input, results)
                  }
                />
                <SearchResultList results={searchItem.results} />
              </div>
              {index < searchData.length - 1 && <p>to</p>}
            </React.Fragment>
          ))}
        </div>
        <div className="roket">
          <p>GO</p>
          {/* <img src="../assets/roket.png" alt="roket" /> */}
          <div className="algorithm-switch">
            <label>
              BFS
              <input
                type="radio"
                value="bfs"
                checked={searchAlgorithm === 'bfs'}
                onChange={() => setSearchAlgorithm('bfs')}
              />
            </label>
            <label>
              IDS
              <input
                type="radio"
                value="ids"
                checked={searchAlgorithm === 'ids'}
                onChange={() => setSearchAlgorithm('ids')}
              />
            </label>
          </div>
          <button onClick={handleGoButtonClick}>Go</button>
        </div>
    </div>
  );
}

export default Body;