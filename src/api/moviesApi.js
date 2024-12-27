const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export const fetchMovies = async (pageNum = 1, query = "", totalResults = 0) => {
  const MOVIES_PER_PAGE = 10;

  if (!query) return { movies: [], totalResults: 0, hasMore: false };

  if (pageNum > Math.ceil(totalResults / MOVIES_PER_PAGE) && totalResults > 0) {
    return { movies: [], totalResults: 0, hasMore: false };
  }

  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${pageNum}&type=movie`
    );

    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();

    if (data.Response === "False") throw new Error(data.Error);

    const newTotalResults = pageNum === 1 ? parseInt(data.totalResults) : totalResults;
    const hasMore = pageNum * MOVIES_PER_PAGE < newTotalResults;

    return { movies: data.Search || [], totalResults: newTotalResults, hasMore };
  } catch (err) {
    throw new Error(err.message);
  }
};