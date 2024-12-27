import React, { useEffect, useCallback, useContext } from "react";
import { MovieContext } from "./context/MovieContext";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { throttle } from "./helper/helperfunc";
import "./App.css";

const App = () => {
  const {
    movies,
    searchQuery,
    page,
    setPage,
    isLoading,
    error,
    hasMore,
    fetchMoviesData,
  } = useContext(MovieContext);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      if (isLoading || !hasMore) return;

      const scrollPosition = window.innerHeight + window.pageYOffset;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight - 100;

      if (scrollPosition > threshold) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 500),
    [isLoading, hasMore]
  );

  // Add scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Fetch movies on search query or page change
  useEffect(() => {
    if (searchQuery) {
      fetchMoviesData(page, searchQuery);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => (document.body.style.overflow = "auto");
  }, [isLoading]);

  console.log("movies:", movies);
  

  return (
    <div className="app">
      <Navbar />
      <SearchBar />

      {error && <div className="error">{error}</div>}

      <div className="movies-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
        ))}
      </div>

      {isLoading && (
        <div className="loader">
          <div className="loader-spinner"></div>
          <div>Loading movies...</div>
        </div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className="end-message">No more movies to load</div>
      )}
    </div>
  );
};

export default App;
