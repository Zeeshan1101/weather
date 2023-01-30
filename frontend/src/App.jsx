import { useState, useEffect } from "react";
import MapWrap from "./MapWrap";
import "./app.css";
import axios from "axios";
function App() {
  const [cities, setCities] = useState(null);
  let [page, setPage] = useState(0);
  // let page = 0;
  console.log(cities);

  // Get the weather data and return it
  const getCitesWeather = async (p) => {
    const weatherInfo = await axios.get("http://localhost:5000/weather", {
      params: { q: p },
    });
    return weatherInfo.data.list;
  };

  useEffect(() => {
    (async () => {
      const weather = await getCitesWeather(page);
      setCities(weather);
      page = page + 1;
    })();

    // automatically refresh the city list every 5 minutes (300000)
    const DataRefresh = setInterval(async () => {
      if (page === 2) {
        page = 0;
      } else {
        page = page + 1;
      }
      console.log(page);
      const weather = await getCitesWeather(page);
      setCities(weather);
    }, 300000);
    // clear the DataRefresh setInterval
    return () => {
      clearInterval(DataRefresh);
    };
  }, []);

  // function for ON Click event
  const ClickHandler = async () => {
    const weather = await getCitesWeather(page);
    setCities(weather);
    if (page === 2) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
    console.log(page);
  };
  return (
    <>
      <div id="map">
        <MapWrap cities={cities} />
      </div>
      <div className="button">
        <button onClick={ClickHandler}>Get More Cites Weather</button>
      </div>
    </>
  );
}

export default App;
