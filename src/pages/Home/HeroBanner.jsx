import { useEffect, useState } from "react";
import axios from "axios";
import "./HeroBanner.css"; // Optional if you want to separate the styles
import "../../styles/banner.css";


const BACKDROP_BASE =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTY1MDQ3Njc3NDIzYWNmZTc5MmIxOTkwMjBiM2YwOSIsIm5iZiI6MS43NDY4ODU3MzY2MDA5OTk4ZSs5LCJzdWIiOiI2ODFmNWM2ODI5NTgyZTExMTJhMTU5NjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.73-9CXhUrfc3Qp-0LEbzOze-OQcvndn2Igqsrx4eA-4";
const API_KEY = "https://api.themoviedb.org/3/trending/all/day"; // Replace this

const HeroBanner = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
        );
        const imagePaths = res.data.results
          .filter((item) => item.backdrop_path)
          .map((item) => `${BACKDROP_BASE}${item.backdrop_path}`);
        setImages(imagePaths);
      } catch (err) {
        console.error("Error fetching background images:", err);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true); // fade-in after image switches
      }, 400); // match with fade-out duration
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  return (
    <div
      className={`hero-banner ${fade ? "fade-in" : "fade-out"}`}
      style={{
        backgroundImage: `url(${images[current]})`,
      }}
    >
      <div className="hero-overlay">
        <h1>Welcome to Netflix Clone</h1>
      </div>
    </div>
  );
};

export default HeroBanner;
