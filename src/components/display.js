import React, { useState, useEffect } from "react";
import propertiesData from "../properties.json";
import { Modal, Button } from "react-bootstrap";

const Display = ({ searchParams }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [show, setShow] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const filterProperties = (properties, params) => {
      return properties.filter((property) => {
        return (
          (!params.propertyType || property.type === params.propertyType) &&
          (!params.minPrice || property.price >= params.minPrice) &&
          (!params.maxPrice || property.price <= params.maxPrice) &&
          (!params.bedrooms || property.bedrooms === parseInt(params.bedrooms)) &&
          (!params.dateAdded || new Date(property.added.date) >= new Date(params.dateAdded)) &&
          (!params.postcode || property.postcode.includes(params.postcode))
        );
      });
    };

    setFilteredProperties(filterProperties(propertiesData.properties, searchParams));
  }, [searchParams]);

  const handleShow = (property) => {
    setSelectedProperty(property);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedProperty(null);
    setShow(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Available Properties</h1>
      <div className="row">
        {filteredProperties.map((property) => (
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
                <button
                  className="btn btn-primary"
                  onClick={() => handleShow(property)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProperty && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProperty.type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedProperty.picture}
              alt={selectedProperty.type}
              className="img-fluid mb-3"
            />
            <p>
              <strong>Location:</strong> {selectedProperty.location}
            </p>
            <p>
              <strong>Price:</strong> ${selectedProperty.price.toLocaleString()}
            </p>
            <p>
              <strong>Bedrooms:</strong> {selectedProperty.bedrooms}
            </p>
            <p>
              <strong>Tenure:</strong> {selectedProperty.tenure}
            </p>
            <p>
              <strong>Description:</strong> {selectedProperty.description}
            </p>
            <p>
              <strong>Added:</strong> {`${selectedProperty.added.day} ${selectedProperty.added.month}, ${selectedProperty.added.year}`}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => window.open(selectedProperty.url, "_blank")}
            >
              Visit Listing
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Display;
