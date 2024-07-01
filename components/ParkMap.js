import React, { useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindowF,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 40.748817,
  lng: -73.985428,
};

export const ParkMap = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [numOfParks, setNumOfParks] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [selectedPark, setSelectedPark] = useState(null);

  const cityRef = useRef(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handleFormSubmit = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    const places = searchBoxRef.current?.getPlaces();
    const city = cityRef.current?.value;

    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry.location;
      setCenter({ lat: location.lat(), lng: location.lng() });
      searchNearbyParks({ lat: location.lat(), lng: location.lng() });
    } else if (city) {
      try {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        const response = await axios.get(geocodeUrl);
        const { results } = response.data;

        if (results.length > 0) {
          const location = results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
          searchNearbyParks({ lat: location.lat, lng: location.lng });
        } else {
          alert("City not found");
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLocation);
          searchNearbyParks(userLocation);
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    } else {
      alert("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  const searchNearbyParks = (location) => {
    if (window.google) {
      const service = new window.google.maps.places.PlacesService(
        mapRef.current
      );
      const request = {
        location: location,
        radius: 5000,
        type: ["park"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newMarkers = results.map((result) => ({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            name: result.name,
            address: result.vicinity,
            rating: result.rating,
          }));
          setMarkers(newMarkers);
          setNumOfParks(newMarkers.length);
        }
      });
    }
  };

  return (
    <section className="mt-10 mb-10 p-4">
      <h3 className="uppercase text-xl font-bold mb-2">
        Locate Parks Near You
      </h3>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center border border-gray-400 rounded-md w-min"
        >
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={handleFormSubmit}
          >
            <div className="flex">
              <input
                ref={cityRef}
                placeholder="Enter city name"
                name="city"
                type="text"
                className="px-2 w-72 focus:outline-none focus:ring-0"
              />
            </div>
          </StandaloneSearchBox>
          <button
            type="submit"
            className="px-4 py-2 text-blue-500 border-l border-gray-300 hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </form>
        <h3 className="mt-2 mb-2">{numOfParks} Park(s) found</h3>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
        >
          {markers.map((marker, index) => (
            <MarkerF
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelectedPark(marker)}
            />
          ))}
          {selectedPark && (
            <InfoWindowF
              position={{ lat: selectedPark.lat, lng: selectedPark.lng }}
              onCloseClick={() => setSelectedPark(null)}
              zIndex={1}
            >
              <div className="text-lg font-medium">
                <h3>{selectedPark.name}</h3>
                <p>{selectedPark.address}</p>
                <p>{selectedPark.rating}</p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      </LoadScript>
    </section>
  );
};
