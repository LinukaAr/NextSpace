import React, { useState } from "react";
import "../assets/css/search.css";

function Search({ setSearchParams }) {
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      propertyType,
      minPrice: minPrice ? parseFloat(minPrice) : "",
      maxPrice: maxPrice ? parseFloat(maxPrice) : "",
      bedrooms: bedrooms ? parseInt(bedrooms, 10) : "",
      dateAdded,
      postcode,
    });
  };

  return (
    <div className="search-container">
      <div className="search-overlay">
        <h1 className="text-center text-white mb-4">Find Your Dream Property</h1>
        <form onSubmit={handleSearch} className="container">
          <div className="row">
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
                  <option value="house">House</option>
                  <option value="flat">Flat</option>
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
                <label htmlFor="bedrooms" className="text-white">Bedrooms</label>
                <input
                  type="number"
                  id="bedrooms"
                  className="form-control"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="date-added" className="text-white">Date Added</label>
                <input
                  type="date"
                  id="date-added"
                  className="form-control"
                  value={dateAdded}
                  onChange={(e) => setDateAdded(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="postcode" className="text-white">Postcode</label>
                <input
                  type="text"
                  id="postcode"
                  className="form-control"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
