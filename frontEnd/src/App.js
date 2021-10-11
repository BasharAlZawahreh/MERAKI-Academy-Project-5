import React from 'react';
import './App.css';
import Register from './components/Auth/Register/register';
import SearchForm from './components/SearchForm/searchForm';
import SearchResult from './components/SearchResult/searchResult';

export default function App() {
  return (
    <div>
      {/* <SearchForm/>

      <SearchResult/> */}

      <Register/>
    </div>
  );
}
