const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.NASA_API_KEY;

app.use(cors());
app.use(express.json());

// Format today's date
const getFormattedDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// 1. Astronomy Picture of the Day
app.get("/api/apod", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
      {
        headers: {
          "User-Agent": "NASA-Frontend-App"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch APOD data" });
  }
});

// 2. Asteroids (Near Earth Objects)
app.get("/api/asteroids", async (req, res) => {
  try {
    const date = getFormattedDate();
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`
    );
    const asteroids = response?.data?.near_earth_objects[date] || [];
    const formatted = asteroids.map((a) => {
      const min = a.estimated_diameter.kilometers.estimated_diameter_min;
      const max = a.estimated_diameter.kilometers.estimated_diameter_max;
      const avgSize = (((min + max) / 2) * 1000).toFixed(2); // in meters
      const ateroidDate = a.close_approach_data?.[0]?.close_approach_date || "N/A";
      const approach = a.close_approach_data?.[0];
      const distanceMissed = approach?.miss_distance?.kilometers
        ? parseFloat(approach.miss_distance.kilometers).toFixed(2)
        : "N/A";

      return {
        name: a.name,
        size: parseFloat(avgSize),
        date: ateroidDate,
        missDistance: distanceMissed,
        isHazardous: a.is_potentially_hazardous_asteroid,
      };
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch asteroid data" });
  }
});

// 3. Earth Polychromatic Imaging Camera (EPIC)
app.get("/api/epic", async (req, res) => {

  try {
    const date = getFormattedDate(); // e.g., 2025-06-26
    let response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
    );

    let imagesData = response.data;
    let datePath = date.replaceAll("-", "/");

    // fallback if no data
    if (!imagesData || imagesData.length === 0) {
      const fallback = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/all?api_key=${API_KEY}`
      );

      const latestDate = fallback.data[0].date;
      datePath = latestDate.replaceAll("-", "/");

      const latestImages = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${latestDate}?api_key=${API_KEY}`
      );

      imagesData = latestImages.data;
    }

    // Construct array with image URLs
    const imageUrls = imagesData.map((img) => ({
      ...img,
      imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${datePath}/png/${img.image}.png`,
    }));

    const epicData = imageUrls[0]; // you can change this to a summary object if needed

    return res.json({ epicData, imageUrls });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch EPIC data" });
  }
});


// 4. Mars Rovers - Get all rovers
app.get("/api/rovers", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${API_KEY}`
    );
    res.json(response?.data?.rovers || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Mars rovers" });
  }
});

// 5. Mars Rover Photos
app.get("/api/photos", async (req, res) => {
  const { rover_name, earth_date } = req.query;

  if (!rover_name || !earth_date) {
    return res.status(400).json({ error: "rover_name and earth_date are required" });
  }

  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?earth_date=${earth_date}&api_key=${API_KEY}`
    );
    res.json(response?.data?.photos || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Mars photos" });
  }
});

app.get("/api/news", async (req, res) => {
  try {
    const rssUrl = "https://www.nasa.gov/news-release/feed/";
    const rssResponse = await axios.get(rssUrl, {
      headers: { "User-Agent": "NASA-Node-App" },
      responseType: "text",
    });

    // Parse XML to JSON
    xml2js.parseString(rssResponse.data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to parse RSS" });
      }

      const items = result.rss.channel[0].item;
      const latest = items[0];

      res.json({
        title: latest.title[0],
        link: latest.link[0],
        pubDate: latest.pubDate[0],
        description: latest.description[0],
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch NASA news" });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

