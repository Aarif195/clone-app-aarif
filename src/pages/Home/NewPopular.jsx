import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";



const NewPopular = () => {
  return (
    <>
      <Navbar />
      <div className="page-section  more-cards">
        <TitleCards title="Now Playing" category="movie/now_playing"    layout="grid"/>
        <TitleCards title="Airing Today" category="tv/airing_today"   layout="grid" />

        {/* <TitleCards title="Trending Today" category="trending/movie/day" />
        <TitleCards title="Trending This Week" category="trending/movie/week" /> */}
      </div>
    </>
  );
};

export default NewPopular;
