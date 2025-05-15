import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../firebase";

export const Navbar = () => {
  const navRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Navbar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!navRef.current) return;
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Netflix Logo" />
        </Link>
      </div>

      <div className="navbar-left desktop-menu">
        {/* <Link to="/">
          <img src={logo} alt="Netflix Logo" />
        </Link> */}

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tvshows">TV Shows</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/new-popular">New & Popular</Link>
          </li>
          <li>
            <Link to="/browse-by-language">Browse by Language</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="input-search">
          <img src={search_icon} alt="" className="icons" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="navbar-profile">
          <div className="dropdown">
            <p onClick={() => logout(navigate)}>Sign Out</p>
          </div>
        </div>

        {/* Hamburger / Cancel Icon */}
        <div className="mobile-menu-toggle">
          {isMobileMenuOpen ? (
            <span
              onClick={() => setIsMobileMenuOpen(false)}
              className="close-icon"
            >
              ✖
            </span>
          ) : (
            <span
              onClick={() => setIsMobileMenuOpen(true)}
              className="hamburger-icon"
            >
              ☰
            </span>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-slide">
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/tvshows" onClick={() => setIsMobileMenuOpen(false)}>
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/movies" onClick={() => setIsMobileMenuOpen(false)}>
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/new-popular"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New & Popular
              </Link>
            </li>
            <li>
              <Link
                to="/browse-by-language"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse by Language
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
