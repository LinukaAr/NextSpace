import React from "react";

function Favourites({ favourites }) {
  return (
    <div className="favourites-container">
      <h2>Favourites</h2>
      <ul>
        {favourites.map((property, index) => (
          <li key={index}>{property}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;