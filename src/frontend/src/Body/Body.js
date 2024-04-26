import React, {useState} from 'react';
import './Body.css'; // Import file CSS untuk styling Body
import SearchBar from '../Searchbar/Searchbar'; // Import SearchBar component
import SearchBar2 from '../Searchbar/SearchBar2';
import SearchResultList from '../Searchbar/SearchResultList';
import Bfs from './Bfs';
import Ids from './Ids';

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

    const fetchData = async () => {
      try {
        // Memuat modul WebAssembly
        const go = new global.Go();
        const wasmPath = process.env.PUBLIC_URL + '/bfsweb.wasm';
        const response = await fetch(wasmPath);
        const buffer = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(buffer, go.importObject);

        // Panggil fungsi BFS dari modul WebAssembly
        const { breadthFirstSearch } = instance.exports;
        breadthFirstSearch("parameter_input");
      } catch (error) {
        console.error('Error loading WebAssembly module:', error);
      }
    };

    fetchData();
   
 
     // Catatan: Ganti "parameter_input" dengan nilai yang Anda inginkan untuk parameter BFS Anda

    // Panggil fungsi pencarian yang sesuai berdasarkan jenis algoritma yang dipilih
    // if (searchAlgorithm === 'BFS') {
    //   // Panggil fungsi BFS dengan startPage dari input SearchBar kiri (indeks 0) dan targetPage
    //   // breadthFirstSearch(searchData[0].input, targetPage);
    // } else if (searchAlgorithm === 'IDS') {
    //   // Panggil fungsi IDS dengan startPage dari input SearchBar kiri (indeks 0) dan targetPage
    //   // iterativeDeepeningWikirace(searchData[0].input, targetPage, maxDepth);
    // }
  };

  return (
    <div className="body-container">
        <div className="body-content">
          {searchData.map((searchItem, index) => (
            <React.Fragment key={searchItem.id}>
              <div className="sub-search">
                <SearchBar2
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
        <div className='option-algo'>
          <Bfs />
          <Ids/>
        </div>
        
    </div>
  );
}

export default Body;