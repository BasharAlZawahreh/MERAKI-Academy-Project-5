import React from "react";
import { useSelector } from "react-redux";

function SearchResult() {
  const state = useSelector((state) => {
    return {
      searches: state.searches.searches,
    };
  });

  return <div>
     {state.searches.map((car,i)=>{
        return  <div key={i}>
              <p>{car.color}</p>
          </div>
      })}
  </div>;
}

export default SearchResult;
