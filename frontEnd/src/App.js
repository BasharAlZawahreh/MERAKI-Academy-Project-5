import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm/searchForm';
import SearchResult from './components/SearchResult/searchResult';

export default function App() {
  return (
    <div>
      <p>App</p>
      <SearchForm/>
      <SearchResult/>
    </div>
  );
}
