import { useEffect, useState } from "react";
import Card from "../Card";
import { fetchAsteroidsData } from "../ApiCall";
import "../../App.css"; // Assuming you have a CSS file for styling

function Asteroids() {
  const [asteroidsData, setAsteroidsData] = useState(null);

  useEffect(() => {
    fetchAsteroidsData().then(setAsteroidsData);
  }, []);
  return (
    <div className="lg:px-20 md:px-12 px-3 py-5 relative md:top-[6.5rem] top-[3rem]  bg-blue-950/40 backdrop-blur-md rounded-lg shadow-lg shadow-slate-800/50">
      {asteroidsData ? (
        <>
          <div className="flex lg:flex-row flex-col items-center justify-center">
            <h1 className="lg:text-5xl md:text-4xl text-2xl text-center text-slate-100 font-['Oswald']">
              Asteroids
            </h1>
            <p className="text-gray-500 lg:p-3 p-1 border-[1px] md:ml-3 text-center rounded-lg border-gray-500 lg:mt-0 mt-1 md:mb-0 mb-5">
              {asteroidsData !== null ? asteroidsData[0]?.date : undefined}
            </p>
          </div>
          <div className="grid grid-flow-row lg:grid-cols-2 grid-cols-1 gap-4 box-border ">
            <div className="lg:mt-6 mt-0">
              <Card data={asteroidsData} name="asteroids" hideButton={true} />
            </div>
            {/* Asteroid data table */}
            <div className="w-full box-border">
              <h1 className="md:text-3xl text-2xl text-center mb-2 text-slate-100 font-['Oswald']">
                Asteroids List
              </h1>
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 box-border">
                <thead>
                  <tr className="bg-blue-900 text-slate-200">
                    <th colSpan={2}>Name</th>
                    <th colSpan={2}>Miss Distance (km)</th>
                    <th colSpan={2}>Dangerous ot Earth</th>
                  </tr>
                </thead>
                <tbody>
                  {asteroidsData ? (
                    asteroidsData.length > 0 ? (
                      asteroidsData.map((asteroid, index) => (
                        <tr key={index} className="text-center text-slate-200">
                          <td colSpan={2}>{asteroid?.name}</td>
                          <td colSpan={2}>{asteroid?.missDistance}</td>
                          <td colSpan={2}>
                            {asteroid?.isHazardous === false ? "False" : "True"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No Asteroids Found</td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="3">Loading...</td>
                    </tr>
                  )}
                </tbody>
                {/* </td> */}
                {/* </tr> */}
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-[35rem]">
          <p className=" text-slate-200 text-center text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Asteroids;
