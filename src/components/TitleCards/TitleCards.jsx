import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
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
      //api.themoviedb.org/3/search/movie?query=lion&include_adult=false&language=en-US&page=1

      https: apiUrl =
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

  return (
    <div className="title-Cards">
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData?.length > 0 &&
          apiData.map((card, index) => {
            return (
              <Link to={`/player/${card.id}`} className="card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                  alt=""
                />
                <p>{card.title || card.name || card.original_title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default TitleCards;
