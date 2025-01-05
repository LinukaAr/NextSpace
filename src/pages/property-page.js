import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, Carousel } from "react-bootstrap";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../assets/css/property-page.css"; 

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
      <Navbar showLinks={false} /> {/* Pass showLinks prop */}
      <div className="property-detail-container">
        <div className="container">
          <h1>{property.type}</h1>
          <div className="row">
            <div className="col-md-8">
              <Carousel>
                {property.images && property.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`${process.env.PUBLIC_URL}/${img}`}
                      alt={`Slide ${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-md-4">
              <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
              <p><strong>Location:</strong> {property.location}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            </div>
          </div>
          <Tabs defaultActiveKey="map" id="property-tabs" className="tabs">
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
            <Tab eventKey="description" title="Description">
              <div className="description-tab">
                <p>{property.description}</p>
              </div>
            </Tab>
            <Tab eventKey="floorPlan" title="Floor Plan">
              <img src={`${process.env.PUBLIC_URL}/${property.floorPlan}`} className="img-fluid" alt="Floor Plan" />
            </Tab>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PropertyDetail;