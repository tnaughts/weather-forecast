import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./WeatherPage.module.css";

// Function to group weather data by date
const groupByDate = (list) => {
  return list.reduce((acc, weather) => {
    const date = new Date(weather.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(weather);
    return acc;
  }, {});
};

const WeatherPage = ({ initialForecast, initialZip }) => {
  const [forecast, setForecast] = useState(initialForecast);
  const [zip, setZip] = useState(initialZip);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { zip } = router.query;

      try {
        const response = await axios.get(`/api/weather?zip=${zip}`);
        setForecast(response.data);
        setZip(zip);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    if (router.query.zip !== zip) {
      fetchData();
    }
  }, [router.query.zip]);

  const groupedForecast = groupByDate(forecast.list);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>5-Day Weather Forecast for {zip}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(groupedForecast).map((date) => (
          <div key={date} className={styles.dateGroup}>
            <h2 className={styles.dateHeader}>{date}</h2>
            <div className={styles.forecast}>
              {groupedForecast[date].map((weather, index) => (
                <div key={index} className={styles.forecastItem}>
                  <p className={styles.time}>
                    {new Date(weather.dt * 1000).toLocaleTimeString()}
                  </p>
                  <p className={styles.temperature}>{weather.main.temp}°F</p>
                  <p className={styles.description}>
                    {weather.weather[0].description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { zip } = params;
  const url = `${process.env.API_URL}/api/weather?zip=${zip}`;

  try {
    const response = await axios.get(url);
    const forecast = response.data;

    return {
      props: {
        initialForecast: forecast,
        initialZip: zip,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default WeatherPage;
