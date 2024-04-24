import React from "react";
import "./SearchResultList.css";
import {SearchResult} from "./SearchResult";


const SearchResultList = ({results}) => {
    return(
        <div className="results-list" style={{ display: results.length > 0 ? 'block' : 'none' }}>
            {results.map((result,id)=>{
                return <SearchResult result={result} key={id}/>
            })}
        </div>
    );
    
};

export default SearchResultList;