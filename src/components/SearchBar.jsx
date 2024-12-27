import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, totalResults } = useContext(MovieContext);

  // Handle search input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="search-bar">
      <h1>🎬 Movie Explorer</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleChange}
        className="search-input"
      />
      {totalResults > 0 ? (
        <div className="search-stats">Found {totalResults} movies</div>
      ) : searchQuery ? (
        <div className="search-stats">No movies found</div>
      ) : null}
    </header>
  );
};

export default SearchBar;