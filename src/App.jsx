

import "./styles/global.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

import TvShows from "./pages/Home/TvShows";
import Movies from "./pages/Home/Movies";
import NewPopular from "./pages/Home/NewPopular";
import MyList from "./pages/Home/MyList";
import BrowseByLanguage from "./pages/Home/BrowseByLanguage";

import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-popular" element={<NewPopular />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/browse-by-language" element={<BrowseByLanguage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
