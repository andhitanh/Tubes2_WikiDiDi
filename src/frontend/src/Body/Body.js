import React from 'react';
import './Body.css'; // Import file CSS untuk styling Body
import SearchBar from '../Searchbar/Searchbar'; // Import SearchBar component
const Body = () => {
  return (
    <div className="body-container">
        <div className="body-content">
            <SearchBar />
            <p>to</p>
            <SearchBar />
        </div>
    </div>
  );
}

export default Body;