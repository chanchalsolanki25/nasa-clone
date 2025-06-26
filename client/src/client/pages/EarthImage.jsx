import { useState, useEffect } from "react";
import { fetchEarthPolychromaticData } from "../ApiCall";

const EarthPage = () => {
  const [epic, setEpic] = useState(null);
  const [imageGallery, setImageGallery] = useState([]);
  let currentDate = null;

  useEffect(() => {
    async function loadEPIC() {
      const res = await fetchEarthPolychromaticData();
      setImageGallery(res.imageUrls);
      if (!res) return;
      const { epicData, imageUrls } = res;

      // Destructure the EPIC details
      const {
        imageUrl,
        date,
        caption,
        centroid_coordinates,
        dscovr_j2000_position,
        sun_j2000_position,
      } = epicData;

      setEpic({
        imageUrl,
        date,
        caption,
        coords: centroid_coordinates,
        dscovrPos: dscovr_j2000_position,
        sunPos: sun_j2000_position,
      });
    }
    loadEPIC();
  }, []);

  if (epic !== null) {
    const fullDate = epic.date;
    currentDate = fullDate?.split(" ")[0];
  }

  const handleImage = (id) => {
    const filterEpic = imageGallery.filter((image) => image.identifier === id);
    setEpic({
      imageUrl: filterEpic[0].imageUrl,
      date: filterEpic[0].date,
      caption: filterEpic[0].caption,
      coords: filterEpic[0].centroid_coordinates,
      dscovrPos: filterEpic[0].dscovr_j2000_position,
      sunPos: filterEpic[0].sun_j2000_position,
    });
  };
  return (
    <div className="lg:px-20 md:px-12 px-3 py-5 relative md:top-[6.5rem] top-[3rem]  bg-blue-950/40 backdrop-blur-md rounded-lg shadow-lg shadow-slate-800/50">
      <div className="flex lg:flex-row flex-col items-center justify-center">
        <h1 className="lg:text-5xl md:text-4xl text-2xl text-center text-slate-100 font-['Oswald']">
          Earth Polychromatic Imaging Camera
        </h1>
        <p className="text-gray-500 lg:p-3 p-1 border-[1px] md:ml-3 text-center rounded-lg border-gray-500 lg:mt-0 mt-1 ">
          {currentDate}
        </p>
      </div>
      <div className="flex md:flex-row flex-col gap-4 box-border my-5">
        <div className="md:w-[50%] w-full flex-1 rounded-lg overflow-hidden border-[2px] border-slate-700 p-3">
          <img
            src={epic?.imageUrl}
            alt="EPIC"
            className="object-contain w-full h-full rounded-lg"
          />
        </div>
        <div className="md:w-[50%] w-full flex-1 border-[2px] border-slate-700 rounded-lg p-3">
          <h2 className="md:text-3xl text-2xl text-center mb-2 text-slate-100 font-['Oswald']">
            Image Details
          </h2>
          <div className="text-slate-200 lg:text-lg text-[16px] py-5">
            <p className="mb-2">
              <strong>Caption:</strong> {epic?.caption}
            </p>
            <p className="mb-2">
              <strong>Coordinates:</strong> {epic?.coords?.lat},{" "}
              {epic?.coords?.lon}
            </p>
            <p className="mb-2">
              <strong>Sun Position:</strong> {epic?.sunPos?.x},{" "}
              {epic?.sunPos?.y}, {epic?.sunPos?.z}
            </p>
            <p className="mb-2">
              <strong>Satellite Position:</strong> {epic?.dscovrPos?.x},{" "}
              {epic?.dscovrPos?.y}, {epic?.dscovrPos?.z}
            </p>
          </div>
          {/* Image gallery */}
          <div>
            <h2 className="md:text-3xl text-2xl text-center mb-4 text-slate-100 font-['Oswald']">
              Image Gallery
            </h2>

            <div className="grid grid-flow-row grid-cols-3 gap-3">
              {imageGallery?.map((image) => (
                <div
                  key={image.identifier}
                  className="w-full h-full hover:border-[2px] border-slate-700 cursor-pointer rounded-lg"
                  onClick={() => handleImage(image.identifier)}
                >
                  <img
                    src={image.imageUrl}
                    alt="EPIC"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthPage;
