import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import "../../styles/grid.css";


const Movies = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("search");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = async (query) => {
    const apiUrl = query
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1`
      : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`; // Default if no search

    try {
      setLoading(true);
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTY1MDQ3Njc3NDIzYWNmZTc5MmIxOTkwMjBiM2YwOSIsIm5iZiI6MS43NDY4ODU3MzY2MDA5OTk4ZSs5LCJzdWIiOiI2ODFmNWM2ODI5NTgyZTExMTJhMTU5NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.73-9CXhUrfc3Qp-0LEbzOze-OQcvndn2Igqsrx4eA-4",
        },
      });
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(queryParam);
  }, [queryParam]);

  return (
    <>
      <Navbar />
      <div className="movies-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : movies.length === 0 ? (
          <h2>No results found.</h2>
        ) : (
          <>
            <h2>
              {queryParam ? `Results for "${queryParam}"` : "Popular Movies"}
            </h2>
            <div className="movie-grid">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Movies;
