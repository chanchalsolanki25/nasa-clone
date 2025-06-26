import { fetchNASAnews } from "../ApiCall"; 
import { useEffect, useState } from "react";

function NasaHotNews() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 fetchNASAnews().then(setNews).finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative w-full lg:h-screen md:h-[600px] h-[350px]  md:px-20 px-3 py-5">
      <div className="bg-black/40 w-auto text-white border-l-4 border-red-500 rounded-xl md:p-5 p-3 mt-6 shadow-lg fixed md:top-105 sm:top-70 top-25 md:left-3 left-auto right-auto">
        {/* <div className='ab'>
      </div> */}
        <h3 className="md:text-2xl text-xl font-semibold mb-2">
          NASA Hot News
        </h3>

        {loading ? (
          <p className="text-gray-300 md:text-lg text-sm">
            Loading latest news...
          </p>
        ) : news ? (
          <div>
            <p className="font-medium md:text-lg text-sm">{news.title}</p>
            <p className="text-sm text-gray-400 mb-2">
              {new Date(news.pubDate).toDateString()}
            </p>
            <a
              href={news.link}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-blue-400 hover:text-blue-300 transition"
            >
              Read Full Article →
            </a>
          </div>
        ) : (
          <p className="text-gray-400">No news available.</p>
        )}
      </div>
    </div>
  );
}
export default NasaHotNews;
