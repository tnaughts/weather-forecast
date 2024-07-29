import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./WeatherPage.module.css";

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

const WeatherPage = ({ forecast, zip, isValidZip }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isValidZip) {
    return (
      <div className={styles.container}>
        <h1 className={styles.header}>Invalid Zip Code</h1>
      </div>
    );
  }

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

  // Validate zip code
  const isValidZip = /^\d{5}$/.test(zip);
  if (!isValidZip) {
    return {
      props: {
        isValidZip: false,
      },
    };
  }

  const url = `${process.env.API_URL}/api/weather?zip=${zip}`;

  try {
    const response = await axios.get(url);
    const forecast = response.data;

    return {
      props: {
        forecast,
        zip,
        isValidZip: true,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default WeatherPage;
