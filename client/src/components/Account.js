import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { UserContext } from "../Usercontext";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import Map from "./Map";
import { ItineraryValidation } from "../validations/ItineraryValidation";

export default function Account() {
  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  const { user, setUser } = useContext(UserContext);
  const [generatedItinerary, setGeneratedItinerary] = useState("");
  const [formData, setFormData] = useState({
    destination: "",
    source: "",
    departure_date: "",
    return_date: "",
    num_travelers: 0,
    accommodation: "",
    preferences: "",
    userid: "",
  });

  formData.userid = user._id;

  const [redirect, setRedirect] = useState(null);
  const { pathname } = useLocation();
  const [mapLatitude, setMapLatitude] = useState(null);
  const [mapLongitude, setMapLongitude] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [destinationImages, setDestinationImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [loadingItinerary, setLoadingItinerary] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMapVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ItineraryValidation.validate(formData, { abortEarly: false });
      setErrors({});
      // console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    const encodedDestination = encodeURIComponent(formData.destination);
    const url = `https://maptoolkit.p.rapidapi.com/geocode/search?q=${encodedDestination}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "8c1816ab09msha4d72c3c3d4c9c0p1551dejsnbc76a392fd4b",
        "X-RapidAPI-Host": "maptoolkit.p.rapidapi.com",
      },
    };
    // console.log(url);
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const firstLocation = data[0];
        const latitude = parseFloat(firstLocation.lat);
        const longitude = parseFloat(firstLocation.lon);
        setMapLatitude(latitude);
        setMapLongitude(longitude);
        setMapVisible(true);
      } else {
        console.log("No location data found in response");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setLoadingItinerary(true);

    try {
      const response = await axios.post(
        "http://localhost/api/generate-itinerary",
        formData
      );
      if (response.status === 200) {
        const data = response.data;
        setGeneratedItinerary(data.itinerary);
      } else {
        console.error("Failed to generate itinerary");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
    } finally {
      setLoadingItinerary(false);
    }

    // await fetchDestinationImages(encodedDestination);
    setLoadingImages(false);
    setFormSubmitted(true);
  };

  return (
    <div>
      {subpage === "profile" && (
        <>
          <div>
            <h2 className="text-center my-2">Enter your travel preferences</h2>
            <div className="container mt-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="destination" className="form-label">
                      Destination:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="destination"
                      name="destination"
                      placeholder="London"
                      value={formData.destination}
                      onChange={handleInputChange}
                    />
                    {errors.destination && (
                      <div className="text-danger">{errors.destination}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="source" className="form-label">
                      Source:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      name="source"
                      placeholder="Mumbai"
                      value={formData.source}
                      onChange={handleInputChange}
                    />
                    {errors.source && (
                      <div className="text-danger">{errors.source}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="departure_date" className="form-label">
                      Departure Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="departure_date"
                      name="departure_date"
                      value={formData.departure_date}
                      onChange={handleInputChange}
                    />
                    {errors.departure_date && (
                      <div className="text-danger">{errors.departure_date}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="return_date" className="form-label">
                      Return Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="return_date"
                      name="return_date"
                      value={formData.return_date}
                      onChange={handleInputChange}
                    />
                    {errors.return_date && (
                      <div className="text-danger">{errors.return_date}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="num_travelers" className="form-label">
                      Number of Travelers:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num_travelers"
                      name="num_travelers"
                      placeholder="E.g. 2"
                      value={formData.num_travelers}
                      onChange={handleInputChange}
                    />
                    {errors.num_travelers && (
                      <div className="text-danger">{errors.num_travelers}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="accommodation" className="form-label">
                      Accommodation:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="accommodation"
                      name="accommodation"
                      placeholder="Hotel, Resort"
                      value={formData.accommodation}
                      onChange={handleInputChange}
                    />
                    {errors.accommodation && (
                      <div className="text-danger">{errors.accommodation}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="preferences" className="form-label">
                    Preferences:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="preferences"
                    name="preferences"
                    placeholder="E.g., Beaches, Museums, Hiking Trails"
                    value={formData.preferences}
                    onChange={handleInputChange}
                  />
                  {errors.preferences && (
                    <div className="text-danger">{errors.preferences}</div>
                  )}
                </div>

                <button type="submit" className="gradient-button">
                  Generate Itinerary
                </button>
              </form>
            </div>
          </div>

          <div className="generated-itinerary">
            {loadingItinerary ? (
              <LoadingSpinner />
            ) : (
              <div>
                {generatedItinerary && (
                  <div>
                    <h3>Generated Itinerary:</h3>
                    {generatedItinerary
                      .split("Day ")
                      .map((dayItinerary, index) => {
                        if (index === 0 && dayItinerary.trim() === "") {
                          return null;
                        }
                        return (
                          <div key={index}>
                            {index !== 0 && <hr />}
                            <p>
                              <strong>Day {index}</strong>
                            </p>
                            {dayItinerary.trim()}
                          </div>
                        );
                      })}
                    <h3 className="map-title">
                      Lets Explore {formData.destination}
                    </h3>
                    {mapVisible &&
                      mapLatitude !== null &&
                      mapLongitude !== null && (
                        <Map latitude={mapLatitude} longitude={mapLongitude} />
                      )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="images-div">
            <div className="container mt-3">
              {loadingImages ? (
                <p>Loading images...</p>
              ) : formSubmitted ? (
                <>
                  {/* <h3>Top photos of {formData.destination}</h3> */}
                  <div className="image-grid">
                    {destinationImages.map((image) => (
                      <div className="image-card" key={image.id}>
                        <img
                          src={image.urls.regular}
                          alt={image.description}
                          className="img-fluid"
                        />
                        <p className="image-title">{image.alt_description}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
