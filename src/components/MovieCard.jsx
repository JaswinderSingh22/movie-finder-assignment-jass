import React from 'react';

const MovieCard = ({ movie }) => {
  // Extract rating from IMDB if available, otherwise use first available rating
  const rating = movie.Ratings?.[0]?.Value || 'N/A';
  
  return (
    <div className="movie-card">
      <img 
        src={movie.Poster}
        alt={movie.Title}
        loading="lazy"
        onError={(e) => {
          e.target.src = '/placeholder-movie.jpg'; // Fallback image
        }}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <div className="movie-metadata">
          <span className="year">{movie.Year}</span>
          <span className="runtime">{movie.Runtime}</span>
        </div>
        <div className="genre">{movie.Genre}</div>
        <div className="ratings">
          <span className="imdb">⭐ {movie.imdbRating}</span>
          {movie.Metascore !== 'N/A' && (
            <span className="metacritic">Metacritic: {movie.Metascore}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCard);