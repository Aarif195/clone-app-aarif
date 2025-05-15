import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";



const TvShows = () => {
  return (
    <>
      <Navbar />
      <div className="page-section  more-cards">
        <TitleCards title="Trending TV Shows" category="tv/top_rated"   layout="grid" />
        {/* <TitleCards title="Popular on TV" category="tv/popular" /> */}
        <TitleCards title="Airing Today" category="tv/airing_today"   layout="grid" />
      </div>
    </>
  );
};

export default TvShows;
