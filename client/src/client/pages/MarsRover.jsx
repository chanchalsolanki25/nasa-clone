import React, { useEffect, useRef, useState } from "react";
import { fetchRovers, fetchPhotos } from "../ApiCall";

function MarsRover() {
  const [rovers, setRovers] = useState([]);
  const [photos, setPhotos] = useState(null);
  const roverName = useRef(null);
  const earthDate = useRef(null);

  //   Fetching the list of rovers from the NASA API
  useEffect(() => {
    fetchRovers().then(setRovers);
  }, []);
   


  //   Function to handle the submission of rover name and date
  const handleShowPhotos = () => {
    const rover_name = (roverName?.current?.value).toLowerCase();
    const earth_date = earthDate?.current?.value;
   
   fetchPhotos(rover_name, earth_date).then(setPhotos);
   
  };
  return (
    <div className="lg:px-20 md:px-12 px-3 py-5 relative md:top-[7rem] top-[5rem]">
      <h1 className="lg:text-5xl md:text-4xl text-2xl text-center text-slate-100 font-['Oswald']">
        Mars Rover Photos
      </h1>
      <div className="flex md:flex-row flex-col gap-2 justify-center my-5">
        {/* Rovers name */}
        <select
          ref={roverName}
          name="rover"
          id="rover"
          placeholder="Rover Name"
          className="p-2 rounded-md md:w-auto w-full bg-slate-800 text-slate-200 border-[1px] border-slate-200"
        >
          <option value="rovers" className="md:text-[1rem] text-[12px] w-auto">
            {rovers.length === 0 ? "Loading rovers..." : "Select Rover"}
          </option>
          {rovers &&
            rovers.map((rover) => (
              <option
                value={rover.name}
                key={rover.id}
                className="md:text-[1rem] text-[12px] md:max-w-auto max-w-[2rem]"
              >
                {rover.name}
              </option>
            ))}
        </select>
        {/* Date picker */}
        <input
          ref={earthDate}
          type="date"
          className="p-2 rounded-md md:w-auto w-full bg-slate-800 text-slate-200 md:ml-4 ml-0 border-[1px] border-slate-200"
          aria-placeholder="Select Date"
        />
        {/* Submit button */}
        <div className="md:ml-4 ml-0 text-center">
          <button
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer"
            onClick={handleShowPhotos}
          >
            Search
          </button>
        </div>
      </div>

      {/* Mars rover photos gallery */}
      <>
        {photos !== null && photos.length > 0 ? (
          <div
            className={`grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 }`}
          >
            {photos?.map((photo) => (
              <div
                key={photo.id}
                className="bg-blue-950/40 backdrop-blur-md p-4 rounded-lg "
              >
                <div className=" rounded-lg md:h-[20rem] h-[15rem] w-full">
                  <img
                    src={photo.img_src}
                    alt="Mars Rover"
                    className="object-contain rounded-lg  h-full w-full"
                  />
                </div>
                <div className="md:text-[1rem] text-[16px]">
                  <p className="text-slate-200 mt-2">
                    Rover: {photo.rover.name} | Camera: {photo.camera.full_name}
                  </p>
                  <p className="text-slate-400">
                    Earth Date: {photo.earth_date}
                    <span className=" text-green-500 font-bold px-2 inline">
                      {photo?.rover.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-200 md:text-xl text[16px] lg:h-[23.5rem] md:h-[13rem] h-[9rem] font-['outfit']  text-center">
            {photos === null
              ? "Select a rover and date to view photos."
              : " No photos available for this rover and date!"}
          </p>
        )}
      </>
    </div>
  );
}

export default MarsRover;
