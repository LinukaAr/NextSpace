import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/display.css";

const Display = ({ searchParams, addFavorite }) => { // addFavorite is a function that will be passed as a prop
  const [filteredProperties, setFilteredProperties] = useState([]); // filteredProperties is a state variable

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/properties.json`); // Fetching the properties data
      const propertiesData = await response.json();// Parsing the JSON data

      // Filtering the properties based on the search parameters
      const filterProperties = (properties, params) => {
        if (!params) return properties;
        return properties.filter((property) => {
          const propertyDate = new Date(`${property.added.month} ${property.added.day}, ${property.added.year}`);
          const startDate = params.startDate ? new Date(params.startDate) : null;
          const endDate = params.endDate ? new Date(params.endDate) : null;

          return (
            (!params.propertyType || property.type === params.propertyType) &&
            (!params.minPrice || property.price >= params.minPrice) &&
            (!params.maxPrice || property.price <= params.maxPrice) &&
            (!params.minBedrooms || property.bedrooms >= params.minBedrooms) &&
            (!params.maxBedrooms || property.bedrooms <= params.maxBedrooms) &&
            (!startDate || propertyDate >= startDate) &&
            (!endDate || propertyDate <= endDate) &&
            (!params.postcode || property.postcode.startsWith(params.postcode))
          );
        });
      };

      setFilteredProperties(filterProperties(propertiesData.properties, searchParams));// Setting the filtered properties in the state variable
    };

    fetchProperties();// Calling the fetchProperties function
  }, [searchParams]);

  // Function to format the date
  const formatDate = (added) => {
    const { month, day, year } = added;
    return new Date(`${month} ${day}, ${year}`).toLocaleDateString();
  };

  //Drag and drop
  const handleDragStart = (event, property) => {
    event.dataTransfer.setData("property", JSON.stringify(property));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 head">Available Properties</h1>
      <div className="row">
        {filteredProperties.map((property) => (
          <div 
            className="col-md-4 mb-4" 
            key={property.id}
            >
            <div className="card" draggable
            onDragStart={(event) => handleDragStart(event, property)}>
              <img
                src={property.picture}
                className="card-img-top"
                alt={property.type}
              />
              <div className="card-body">
                <h5 className="card-title">{property.type}</h5>
                <p className="card-text">
                  <strong>Price:</strong> ${property.price.toLocaleString()}
                  <br />
                  <strong>Location:</strong> {property.location}
                  <br />
                  <strong>Bedrooms:</strong> {property.bedrooms}
                  <br />
                  <strong>Date Added:</strong> {formatDate(property.added)}
                </p>
                <button
                  onClick={() => addFavorite(property)}
                  className="btn btn-warning fav"
                >
                  ♥
                </button>
                
                {/* Link to the property details page with the property ID */}
                <Link to={`/property/${property.id}`} className="btn btn-details ml-2">
                  View Details
                </Link>
                 {/* Draggable icon */}
                 <span
                className="draggable-icon"
                draggable
                onDragStart={(event) => handleDragStart(event, property)}
              >
                &#9776;
              </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;