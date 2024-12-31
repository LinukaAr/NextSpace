import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import Navbar from "../components/navbar";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/properties.json`);
      const propertiesData = await response.json();
      const property = propertiesData.properties.find((prop) => prop.id === id); 
      setProperty(property);
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <>
      <Navbar />
    <div className="container mt-5">
      <h1 className="text-center mb-4">{property.type}</h1>
      <div className="row">
        <div className="col-md-8">
          <img src={property.picture} className="img-fluid mb-3" alt={property.type} />
          <div className="thumbnail-images">
            {property.images && property.images.map((img, index) => (
              <img key={index} src={img} className="img-thumbnail" alt={`Thumbnail ${index}`} />
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        </div>
      </div>
      <Tabs defaultActiveKey="description" id="property-tabs" className="mt-4">
        <Tab eventKey="description" title="Description">
          <p>{property.description}</p>
        </Tab>
        <Tab eventKey="floorPlan" title="Floor Plan">
          <img src={property.floorPlan} className="img-fluid" alt="Floor Plan" />
        </Tab>
        <Tab eventKey="map" title="Map">
          <iframe
            src={`https://www.google.com/maps?q=${property.location}&output=embed`}
            width="100%"
            height="400"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Google Map"
          ></iframe>
        </Tab>
      </Tabs>
    </div>
    </>
  );
};

export default PropertyDetail;