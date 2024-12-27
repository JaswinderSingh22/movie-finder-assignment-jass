import React, { createContext, useState, useRef, useCallback } from "react";
import { fetchMovies } from '../api/moviesApi';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const requestCount = useRef(0);
  const isFetching = useRef(false);
  const lastSearchQuery = useRef("");

  const MOVIES_PER_PAGE = 10;

  console.log("totalResults:", totalResults);

  // Fetch movies function
  const fetchMoviesData = useCallback(
    async (pageNum = 1, query = "") => {
      if (!query || isFetching.current) return;
      if (pageNum > Math.ceil(totalResults / MOVIES_PER_PAGE) && totalResults > 0) {
        setHasMore(false);
        return;
      }

      try {
        isFetching.current = true;
        setIsLoading(true);
        setError(null);

        const { movies: newMovies, totalResults: newTotalResults, hasMore: newHasMore } = await fetchMovies(pageNum, query, totalResults);

        if (newMovies.length === 0) throw new Error('No movies found');

        if (pageNum === 1) setTotalResults(newTotalResults);

        setMovies((prev) =>
          query !== lastSearchQuery.current
            ? newMovies
            : [...prev, ...newMovies]
        );

        lastSearchQuery.current = query;
        setHasMore(newHasMore);
      } catch (err) {
        setError(err.message);
        setHasMore(false);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    },
    [totalResults]
  );

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        isLoading,
        error,
        hasMore,
        fetchMoviesData,
        setHasMore,
        setError,
        setIsLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};