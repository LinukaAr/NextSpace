import React, { useEffect } from "react";
import "../assets/css/favourites.css";

// Favorites component to display the list of favorite properties
const Favorites = ({ favorites, removeFavorite, addFavorite }) => {
  // Function to add a property to the favorites list
  const handleDrop = (event) => {
    event.preventDefault();
    const property = JSON.parse(event.dataTransfer.getData("property"));
    addFavorite(property);
  };

  // Function to prevent the default behavior of the browser
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragStart = (event, property) => {
    event.dataTransfer.setData("property", JSON.stringify(property));
  };

  useEffect(() => {
    console.log("Favorites component updated:", favorites);
  }, [favorites]);

  return (
    <div
      className="favorites-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="favorites-list">
        {favorites.map((property) => (
          <div className="favorite-item" key={property.id}>
            <button
              onClick={() => removeFavorite(property.id)}
              className="btn  btn-clear"
            >
              X
            </button>
            <img src={property.picture} alt={property.type} />
            <div>
              <h5>{property.type}</h5>
              <p>{property.location}</p>
              {/* Draggable three-lines icon */}
              <span
                className="draggable-icon"
                draggable
                onDragStart={(event) => handleDragStart(event, property)}
              >
                &#9776;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;