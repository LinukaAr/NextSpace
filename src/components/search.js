import React, { useState } from "react";
import "../assets/css/search.css";

function Search({ setSearchParams }) {
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      propertyType,
      minPrice: minPrice ? parseFloat(minPrice) : "",
      maxPrice: maxPrice ? parseFloat(maxPrice) : "",
      minBedrooms: minBedrooms ? parseInt(minBedrooms, 10) : "",
      maxBedrooms: maxBedrooms ? parseInt(maxBedrooms, 10) : "",
      startDate,
      endDate,
      postcode,
    });
  };

  return (
    <div className="search-container">
      <div className="search-overlay">
        <h1 className="text-center text-white mb-4">Find Your Dream Property</h1>
        <form onSubmit={handleSearch} className="container">
          <div className="row mb-3">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="property-type" className="text-white">Property Type</label>
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
                <label htmlFor="min-price" className="text-white">Min Price</label>
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
                <label htmlFor="max-price" className="text-white">Max Price</label>
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
                <label htmlFor="postcode" className="text-white">Postcode Area</label>
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
                <label htmlFor="minBedrooms" className="text-white">Min Bedrooms</label>
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
                <label htmlFor="maxBedrooms" className="text-white">Max Bedrooms</label>
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
            <div className="col-md-3 offset-md-9">
              <button type="submit" className="btn btn-primary w-100">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
