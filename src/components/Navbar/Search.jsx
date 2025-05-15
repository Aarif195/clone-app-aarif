import React, { useState } from "react";
import search_icon from "../../assets/search_icon.svg";



const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update state on input change
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Pass search query to parent
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter key
    }
  };

  return (
    <div className="input-search">
      <img
        src={search_icon}
        alt="search"
        className="icons"
        onClick={handleSearch} // Trigger search on click
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange} // Update state on input change
        onKeyDown={handleKeyDown} // Trigger search on Enter key
      />
    </div>
  );
};

export default Search;
