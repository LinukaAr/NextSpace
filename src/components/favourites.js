import React from "react";
import "../assets/css/favourites.css";


// Favorites component to display the list of favorite properties
const Favorites = ({ favorites, removeFavorite, clearFavorites }) => {
  return (
    <div className="favorites-container">
      
      <div className="favorites-list">
        {favorites.map((property) => ( // Loop through the favorites array and display the favorite properties
          <div className="favorite-item" key={property.id}>
            <img src={property.picture} alt={property.type} />
            <div>
              <h5>{property.type}</h5>
              <p>{property.location}</p>
              <button
                onClick={() => removeFavorite(property.id)}// Button to remove the favorite property
                className="btn btn-danger btn-clear"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* // Button to clear all the favorite properties */}
      <button onClick={clearFavorites} className="btn btn-danger mb-3">
        Clear All
      </button>
    </div>
  );
};

export default Favorites;