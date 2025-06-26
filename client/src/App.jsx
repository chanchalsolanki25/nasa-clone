import "./App.css";
import ApodPage from "./client/pages/ApodPage";
import Asteroids from "./client/pages/Asteroids";
import Backround from "./client/Backround";
import EarthImage from "./client/pages/EarthImage";
import Home from "./client/pages/Home";
import MarsRover from "./client/pages/MarsRover";
import Navbar from "./client/Navbar";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <section className="relative">
        <Backround />
      </section>
      <section className="relative">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/apod" element={<ApodPage />} />
          <Route exact path="/mars-rover" element={<MarsRover />} />
          <Route exact path="/asteroids" element={<Asteroids />} />
          <Route exact path="/earth-image" element={<EarthImage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
