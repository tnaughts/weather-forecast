// pages/api/weather.js
import axios from "axios";

export default async function handler(req, res) {
  const { zip } = req.query;
  const apiKey = process.env.PUBLIC_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&units=imperial&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
}
