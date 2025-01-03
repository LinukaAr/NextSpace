import React, { useState, useEffect } from "react";
import "../assets/css/search.css";
import Favorites from "./favourites";
import Display from "./display"; // Import Display component
import { FaHeart } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Search({ setSearchParams }) {
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [postcode, setPostcode] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchParams, setSearchParamsState] = useState({});

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {
      propertyType,
      minPrice: minPrice ? parseFloat(minPrice) : "",
      maxPrice: maxPrice ? parseFloat(maxPrice) : "",
      minBedrooms: minBedrooms ? parseInt(minBedrooms, 10) : "",
      maxBedrooms: maxBedrooms ? parseInt(maxBedrooms, 10) : "",
      startDate,
      endDate,
      postcode,
    };
    setSearchParams(params);
    setSearchParamsState(params);
  };

  const addFavorite = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const newFavorites = [...favorites, property];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      alert("Added to favourites");
    }
  };

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((property) => property.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="search-container">
      <div className="favorites-icon" onClick={() => setShowFavorites(true)}>
        <FaHeart size={30} color="red" />
      </div>
      <Modal show={showFavorites} onHide={() => setShowFavorites(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Favorites
            favorites={favorites}
            removeFavorite={removeFavorite}
            clearFavorites={clearFavorites}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFavorites(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="search-overlay">
          <h1 className="text-center text-black mb-4">Find Your Dream Property</h1>
          <form onSubmit={handleSearch} className="container">
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="property-type" className="text-black">Property Type</label>
                  <select
                    id="property-type"
                    className="form-control"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">Any</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                    <option value="Villa">Villa</option>
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="min-price" className="text-black">Min Price</label>
                  <input
                    type="number"
                    id="min-price"
                    className="form-control"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="max-price" className="text-black">Max Price</label>
                  <input
                    type="number"
                    id="max-price"
                    className="form-control"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="postcode" className="text-black">Postcode Area</label>
                  <input
                    type="text"
                    id="postcode"
                    className="form-control"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="minBedrooms" className="text-black">Min Bedrooms</label>
                  <input
                    type="number"
                    id="minBedrooms"
                    className="form-control"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="maxBedrooms" className="text-black">Max Bedrooms</label>
                  <input
                    type="number"
                    id="maxBedrooms"
                    className="form-control"
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="startDate" className="text-black">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="endDate" className="text-black">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 offset-md-9">
                <button type="submit" className="btn btn-primary w-100">Search</button>
              </div>
            </div>
          </form>
        </div>
        <Display searchParams={searchParams} addFavorite={addFavorite} /> {/* Pass searchParams and addFavorite to Display */}
      </div>
    </div>
  );
}

export default Search;