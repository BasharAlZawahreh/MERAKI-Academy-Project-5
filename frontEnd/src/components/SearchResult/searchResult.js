import React from "react";
import { useSelector } from "react-redux";

function SearchResult() {
  const state = useSelector((state) => {
    // specify which state to subscribe to (state tree => reducer => state name )
    return {
      searches: state.searches.searches,
    };
  });

  return <div>
      {state.searches.map((s,i)=>{
        return  <div key={i}>
              {s}
          </div>
      })}
  </div>;
}

export default SearchResult;
