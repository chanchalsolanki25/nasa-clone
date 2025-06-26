import { useState, useEffect } from "react";
import { fetchApodData } from "../ApiCall";

function ApodPage() {
  const [apodData, setApodData] = useState(null);
  useEffect(() => {
    fetchApodData().then(setApodData);
  }, []);
  return (
    <div className="lg:px-20 md:px-12 px-3 py-5 relative md:top-[6rem] top-[3em] bg-blue-950/40 backdrop-blur-md rounded-lg shadow-lg shadow-slate-800/50 text-slate-200">
      {apodData ? (
        <>
          <div className="flex lg:flex-row flex-col items-center justify-center">
            <h1 className="lg:text-5xl md:text-4xl text-2xl text-center text-slate-100 font-['Oswald']">
              Astronomy Picture of the Day
            </h1>
            <p className="text-gray-500 lg:p-3 p-1 border-[1px] md:ml-3 text-center rounded-lg border-gray-500 lg:mt-0 mt-1">
              {apodData?.date}
            </p>
          </div>
          <div className=" w-[70%] lg:h-[30rem] md:h-[20rem] h-[10rem] rounded-lg overflow-hidden object-cotain mx-auto mt-5">
            <img
              src={apodData?.url}
              alt="APOD"
              className="object-conatin w-full h-full rounded-lg"
            />
          </div>

          <div className="mt-4 text-slate-100 h-auto">
            <h2 className="lg:text-3xl text-xl font-['outfit'] text-slate-200">
              {apodData?.title}
            </h2>

            <p className="mt-2 md:text-xl text-[16px] font-['outfit'] text-slate-300 text-justify">
              {apodData?.explanation}
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[35rem]">
          <p className=" text-slate-200 text-center text-xl">
            Loading...
          </p>
        </div>
      )}
    </div>
  );
}

export default ApodPage;
