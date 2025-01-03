import React from "react";
import "../assets/css/favourites.css";


const Favorites = ({ favorites, removeFavorite, clearFavorites }) => {
  return (
    <div className="favorites-container">
      
      <div className="favorites-list">
        {favorites.map((property) => (
          <div className="favorite-item" key={property.id}>
            <img src={property.picture} alt={property.type} />
            <div>
              <h5>{property.type}</h5>
              <p>{property.location}</p>
              <button
                onClick={() => removeFavorite(property.id)}
                className="btn btn-danger btn-clear"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={clearFavorites} className="btn btn-danger mb-3">
        Clear All
      </button>
    </div>
  );
};

export default Favorites;