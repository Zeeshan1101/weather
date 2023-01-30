import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapWrap = ({ cities }) => {
  const position = cities
    ? [cities[0].coord.lat, cities[0].coord.lon]
    : [51.505, -0.09];
  return (
    <>
      {cities ? (
        <MapContainer
          center={position}
          zoom={6}
          style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((city, i) => {
            return (
              <Marker
                key={i}
                position={{ lat: city.coord.lat, lon: city.coord.lon }}>
                <Popup>
                  <div className="name">{city.name}</div>
                  <div className="popup_content">
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    <div className="weather_content">
                      <div>
                        {city.weather[0].main}
                        <div className="temp">
                          <img src="/temp.png" alt="" />
                          {Math.floor(city.main.temp - 273)} &#8451;
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : (
        "Loading...."
      )}
    </>
  );
};

export default MapWrap;
