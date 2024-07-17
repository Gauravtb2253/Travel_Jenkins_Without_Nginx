import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Usercontext";
import Navbar from "./Navbar";

const ShowPreviousItineraries = () => {
  const { user } = useContext(UserContext);
  const [itineraries, setItineraries] = useState([]);
  const [selectedItineraryIndex, setSelectedItineraryIndex] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/getitinerary/${user._id}`
        );
        setItineraries(response.data);
      } catch (error) {
        console.error("Error fetching itineraries", error);
      }
    };

    if (user && user._id) {
      fetchItineraries();
    }
  }, [user]);

  const handleClick = (index) => {
    setSelectedItineraryIndex(selectedItineraryIndex === index ? null : index);
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <h1 className="text-center mb-4">Your Itineraries</h1>
      <ul className="list-group">
        {itineraries.map((itinerary, index) => (
          <>
            <div key={itinerary._id}>
              <li
                className="list-group-item list-group-item-action"
                onClick={() => handleClick(index)}
              >
                Itinerary {index + 1}
              </li>
              <br />
              {selectedItineraryIndex === index && (
                <div className="card mt-2">
                  <div className="card-body">
                    <h5 className="card-title">Itinerary Details</h5>
                    <p className="card-text">
                      <strong>Created on: </strong> 
                      {new Date(itinerary.createdAt).toLocaleDateString('en-GB')}
                    </p>
                    <p className="card-text">
                      <strong>Destination:</strong> {itinerary.destination}
                    </p>
                    <p className="card-text">
                      <strong>Source:</strong> {itinerary.source}
                    </p>
                    <p className="card-text">
                      <strong>Departure Date:</strong>{" "}
                      {new Date(itinerary.departureDate).toLocaleDateString('en-GB')}
                    </p>
                    <p className="card-text">
                      <strong>Return Date:</strong>{" "}
                      {new Date(itinerary.returnDate).toLocaleDateString('en-GB')}
                    </p>
                    <p className="card-text">
                      <strong>Number of Travelers:</strong>{" "}
                      {itinerary.numTravelers}
                    </p>
                    <p className="card-text">
                      <strong>Accommodation:</strong> {itinerary.accommodation}
                    </p>
                    <p className="card-text">
                      <strong>Preferences:</strong> {itinerary.preferences}
                    </p>
                    <p className="card-text">
                      <strong>Itinerary:</strong>
                      {itinerary.itinerary
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
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ShowPreviousItineraries;
