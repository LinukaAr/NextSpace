import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Display = ({ searchParams }) => {
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/properties.json`);
      const propertiesData = await response.json();

      const filterProperties = (properties, params) => {
        return properties.filter((property) => {
          return (
            (!params.propertyType || property.type === params.propertyType) &&
            (!params.minPrice || property.price >= params.minPrice) &&
            (!params.maxPrice || property.price <= params.maxPrice) &&
            (!params.minBedrooms || property.bedrooms >= params.minBedrooms) &&
            (!params.maxBedrooms || property.bedrooms <= params.maxBedrooms) &&
            (!params.dateAdded || new Date(property.added.date) >= new Date(params.dateAdded)) &&
            (!params.startDate || new Date(property.added.date) >= new Date(params.startDate)) &&
            (!params.endDate || new Date(property.added.date) <= new Date(params.endDate)) &&
            (!params.postcode || property.postcode.includes(params.postcode))
          );
        });
      };

      setFilteredProperties(filterProperties(propertiesData.properties, searchParams));
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Properties</h1>
      <div className="row">
        {filteredProperties.map((property) => {
          console.log(property); // Add this line to log the property object
          return (
            <div className="col-md-6 mb-4" key={property.id}>
              <div className="card">
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
                  </p>
                  <Link to={`/property/${property.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Display;