import { useEffect, useState } from "react";
import {
  fetchApodData,
  fetchAsteroidsData,
  fetchEarthPolychromaticData,
} from "../ApiCall";

import Card from "../Card";
function HomeData() {
  const [data, setData] = useState(null);
  const [asteroidsData, setAsteroidsData] = useState(null);
  const [earthPolychromaticData, setEarthPolychromaticData] = useState({});

  useEffect(() => {
    fetchApodData().then(setData);
    fetchAsteroidsData().then(setAsteroidsData);
    fetchEarthPolychromaticData().then(setEarthPolychromaticData);
  }, []);
  return (
    <div className="lg:px-20 md:px-12 px-3 py-5 bg-blue-950/40 backdrop-blur-md rounded-lg shadow-lg shadow-slate-800/50 text-slate-200 lg:top-[7rem] md:top-[6rem] top-[3em]">
      <div className="grid lg:grid-flow-row lg:grid-cols-3 grid-cols-1 md:gap-4 gap-4 box-border">
        {/* APOD */}
        <Card
          data={data}
          name="apod"
          title=" Astronomy Picture of the Day"
        />
        {/* Asteroids */}
        <Card
          data={asteroidsData}
          name="asteroids"
          title="Today's Close Asteroid"
          hideButton={false}
        />
        {/* Earth Polychromatic Image */}
        <Card
          data={earthPolychromaticData}
          title="Earth Polychromatic Image"
          name="earth-image"
        />
      </div>
    </div>
  );
}

export default HomeData;
