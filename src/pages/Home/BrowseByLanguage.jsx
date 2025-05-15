import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";

const Language = () => {
  return (
    <>
      <Navbar />
      <div className="page-section">
        <TitleCards
          title="Hindi Movies"
          category="discover/movie?with_original_language=hi"
        />
        <TitleCards
          title="Spanish Movies"
          category="discover/movie?with_original_language=es"
        />
        <TitleCards
          title="Korean TV Shows"
          category="discover/tv?with_original_language=ko"
        />
      </div>
    </>
  );
};

export default Language;
// https://www.youtube.com/watch?v=1A0-Uy49m20