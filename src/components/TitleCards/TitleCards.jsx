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

  // Fetch movie data
  fetch(
    `https://api.themoviedb.org/3/movie/${
      category ? category : "now_playing"
    }?language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      setApiData(res.results);
    })
    .catch((err) => console.error(err));

  // Add scroll listener
  cardContainer.addEventListener("wheel", handleWheel);

  // Cleanup function to remove event listener when component unmounts
  return () => {
    cardContainer.removeEventListener("wheel", handleWheel);
  };
}, []);


  return (
    <div className="title-Cards">
      <h2>{title ? title : "Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
