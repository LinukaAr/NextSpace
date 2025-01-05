import React, { useState, useEffect, useRef } from "react";
import "../assets/css/search.css";
import Favorites from "./favourites";
import Display from "./display"; // Import Display component

// Define the Search component
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
  const [availablePostcodes, setAvailablePostcodes] = useState([]);
  const displayRef = useRef(null); // Create a reference to the Display component

  // Load favorites from local storage and available postcodes from properties.json
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    // Fetch available postcodes from properties.json
    const fetchProperties = async () => {
      const response = await fetch(`${process.env.PUBLIC_URL}/properties.json`);
      const propertiesData = await response.json();
      const postcodes = [...new Set(propertiesData.properties.map(property => property.postcode))];
      setAvailablePostcodes(postcodes);
    };

    fetchProperties();
  }, []);

  // Handle search form submission
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
    setSearchParams(params); // Call setSearchParams with the search parameters
    setSearchParamsState(params); // Set the searchParams state
    if (displayRef.current) {
      displayRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the Display component
    }
  };

  // Clear all input fields
  const clearInputs = () => {
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    setMinBedrooms("");
    setMaxBedrooms("");
    setStartDate("");
    setEndDate("");
    setPostcode("");
  };

  // Add property to favorites
  const addFavorite = (property) => {
    setFavorites((prevFavorites) => {
      // Check if the property is already in the favorites
      if (prevFavorites.some((fav) => fav.id === property.id)) {
        console.warn(`Property with id ${property.id} is already in favorites`);
        alert(`Property with id ${property.id} is already in favorites`);
        return prevFavorites;
      }
      const newFavorites = [...prevFavorites, property];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      console.log("Favorites updated:", newFavorites);
      alert("Added to Favourites")
      console.log("Local storage updated:", localStorage.getItem("favorites"));
      return newFavorites;
    });
  };

  // Remove property from favorites
  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((property) => property.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites"); // Remove favorites from local storage
  };

  const handleDropOutside = (event) => {
    event.preventDefault();
    const property = JSON.parse(event.dataTransfer.getData("property"));
    removeFavorite(property.id);
  };

  const handleDragOverOutside = (event) => {
    event.preventDefault();
  };

  return (
    <div 
      className="search-container"
      onDrop={handleDropOutside}
      onDragOver={handleDragOverOutside}>
      <div className="favorites-icon btn btn-warning" onClick={() => setShowFavorites(true)}>
        ♥
      </div>
      {/* Favorites sidebar */}
      {showFavorites && (
        <div className="favorites-sidebar">
          <div className="favorites-header">
            <h2>Favorites</h2>
            <button className="close-btn" onClick={() => setShowFavorites(false)}>×</button>
          </div>
          <Favorites
            showFavorites={showFavorites}
            setShowFavorites={setShowFavorites}
            favorites={favorites}
            removeFavorite={removeFavorite}
            addFavorite={addFavorite}
          />
        </div>
      )}
      <div>
        {/* Searching for properties */}
        <div className="search-overlay">
          <h1 className="text-center text-white mb-4">Find Your Dream Property</h1>
          <form onSubmit={handleSearch} className="container">
            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="property-type" className="text-white">Property Type</label>
                  <select
                    id="property-type"
                    className="form-select"
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
                  <label htmlFor="min-price" className="text-white">Min Price</label>
                  <input
                    type="number"
                    id="min-price"
                    className="form-control"
                    value={minPrice}
                    placeholder="Min Price"
                    onChange={(e) => setMinPrice(e.target.value)} // Set the minPrice state
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="max-price" className="text-white">Max Price</label>
                  <input
                    type="number"
                    id="max-price"
                    className="form-control"
                    value={maxPrice}
                    placeholder="Max Price"
                    onChange={(e) => setMaxPrice(e.target.value)} // Set the maxPrice state
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="postcode" className="text-white">Postcode Area</label>
                  <select
                    id="postcode"
                    className="form-control"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  >
                    <option value="">Any</option>
                    {availablePostcodes.map((postcode) => (
                      <option key={postcode} value={postcode}>{postcode}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="minBedrooms" className="text-white">Min Bedrooms</label>
                  <input
                    type="number"
                    id="minBedrooms"
                    className="form-control"
                    value={minBedrooms}
                    placeholder="Min Bedrooms"
                    onChange={(e) => setMinBedrooms(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="maxBedrooms" className="text-white">Max Bedrooms</label>
                  <input
                    type="number"
                    id="maxBedrooms"
                    className="form-control"
                    value={maxBedrooms}
                    placeholder="Max Bedrooms"
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="startDate" className="text-white">Start Date</label>
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
                  <label htmlFor="endDate" className="text-white">End Date</label>
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
              <div className="col-md-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-search me-2">Search</button>
                <button type="button" className="btn btn-search" onClick={clearInputs}>Clear Inputs</button>
              </div>
            </div>
          </form>
        </div>
        <div ref={displayRef}>
          <Display searchParams={searchParams} addFavorite={addFavorite} /> {/* Pass searchParams and addFavorite to Display */}
        </div>
      </div>
    </div>
  );
}

export default Search;