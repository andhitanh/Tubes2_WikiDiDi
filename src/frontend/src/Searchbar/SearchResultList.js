import React from "react";
import "./SearchResultList.css";

const SearchResultList = ({results}) => {
    return(
        <div className="results-list" style={{ display: results.length > 0 ? 'block' : 'none' }}>
            {results.map((result,id)=>{
                return <div key={id}>{result.name}</div>
            })}
        </div>
    );
    
};

export default SearchResultList;