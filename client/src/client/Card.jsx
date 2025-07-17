import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Card({
  data,
  title,
  name = undefined,
  hideButton = undefined,
  className = "",
}) {
  return (
    <div className={`md:my-5 bg-black rounded-md px-3 py-5 h-full`}>
      <h1 className="md:text-3xl text-2xl text-center mb-2 text-slate-100 font-['Oswald']">
        {title}
      </h1>
      {name !== "asteroids" ? (
        data ? (
          <>
            <div className=" w-full md:h-[20rem] h-[12rem] rounded-lg overflow-hidden">
              <img
                src={name === "earth-image" ? data?.epicData?.imageUrl : data?.url}
                alt={name === "earth-image" ? "EPIC" : "APOD"}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>

            <div className="mt-4 text-slate-100 h-auto">
              <h2 className="md:text-[1rem] text-[16px] font-['outfit'] text-slate-200">
                {name === "earth-image" ? data?.epicData?.caption : data?.title}
              </h2>
              <p className="text-gray-500">
                {name === "earth-image" ? data?.epicData?.date : data?.date}
              </p>
              {name === "apod" && (
                <p className="mt-2 text-md font-['outfit'] text-slate-300">
                  {data?.explanation?.length > 200 ? (
                    <>${data?.explanation.slice(0, 100)}...</>
                  ) : (
                    data?.explanation
                  )}
                </p>
              )}
              <Link to={`/${name}`} className="block">
                <button className=" p-2 mt-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer">
                  More Detail
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-slate-200 text-center text-xl">Loading...</p>
        )
      ) : data ? (
        <>
          <div className="w-full h-full">
            <div className="w-full md:h-[22rem] h-[15rem] py-5">
              <ResponsiveContainer className="w-[100%] h-full mx-auto">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    className="fill-green-600"
                    dataKey="size"
                    // fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="">
              <h2 className="md:text-xl text-[16px] font-['outfit'] text-slate-200 mb-2">
                Asteroid Sizes (meters)
              </h2>
            </div>
            {!hideButton && (
              <>
              <p className="text-gray-500">{data[0]?.date}</p>
              <Link to={`/${name}`} className="block">
                <button className=" p-2 mt-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors cursor-pointer">
                  More Detail
                </button>
              </Link>
              </>
            )}
          </div>
        </>
      ) : (
        <p className=" text-slate-200 text-center text-xl">Loading...</p>
      )}
    </div>
  );
}

export default Card;
