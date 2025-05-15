import React, { useEffect, useRef, useState } from "react";
import "./MajorCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const MajorCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTY1MDQ3Njc3NDIzYWNmZTc5MmIxOTkwMjBiM2YwOSIsIm5iZiI6MS43NDY4ODU3MzY2MDA5OTk4ZSs5LCJzdWIiOiI2ODFmNWM2ODI5NTgyZTExMTJhMTU5NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.73-9CXhUrfc3Qp-0LEbzOze-OQcvndn2Igqsrx4eA-4",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const cardContainer = cardsRef.current;

    let apiUrl = "";

    // Default fallback if no category is passed
    if (!category) {
      apiUrl =
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    } else if (
      category.startsWith("discover/") ||
      category.startsWith("trending/")
    ) {
      apiUrl = `https://api.themoviedb.org/3/${category}&language=en-US&page=1`;
    } else if (category.includes("?")) {
      apiUrl = `https://api.themoviedb.org/3/${category}&language=en-US&page=1`;
    } else {
      apiUrl = `https://api.themoviedb.org/3/${category}?language=en-US&page=1`;
    }

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then((res) => {
        if (res && res.results) {
          setApiData(res.results);
        } else {
          setApiData([]);
        }
      })
      .catch((err) => console.error("API fetch error:", err));

    cardContainer.addEventListener("wheel", handleWheel);
    return () => {
      cardContainer.removeEventListener("wheel", handleWheel);
    };
  }, [category]);
  

  const genreList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };
  
  const getGenreName = (id) => genreList[id] || "Unknown";


  return (
    <div className="new-card">
      <h2>{title ? title : "Trending Now"}</h2>
      <div className="new-card-list" ref={cardsRef}>
        {apiData?.length > 0 &&
          apiData.map((card, index) => {
            // Assuming getGenreName is a function that converts genre IDs into names
            const genres = card.genre_ids.map((id) => getGenreName(id));

            return (
              <div className="new-card-item" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.title || card.name || card.original_title}
                />
                <div className="card-info">
                  <p className="card-title">
                    {card.title || card.name || card.original_title}
                  </p>
                  <div className="card-details">
                    <div className="detail-item">
                      <span className="icon">&#9733;</span>{" "}
                      {/* Star icon for rating */}
                      <p>{card.vote_average}</p>
                    </div>
                    <div className="detail-item">
                      <span className="icon">&#128197;</span>{" "}
                      {/* Calendar icon for release date */}
                      <p>{card.release_date}</p>
                    </div>
                    <div className="detail-item">
                      <span className="icon">&#127891;</span> {/* Genre icon */}
                      <p>{genres.join(", ")}</p>
                    </div>
                    <div className="overview">
                      <p>{card.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MajorCards;
