import React from "react";

function MenuItem({ image, name, ingredients, price }) {
  const imageUrl = `https://resto-backend-qfub.onrender.com/images/${image}`;
  return (
    <div className="menuItem">
      <div className="menuItem-image">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="menuItem-content">
        <h3>{name}</h3>
        <p>{ingredients}</p>
      </div>

      <span className="menuItem-price">${price}</span>
    </div>
  );
}

export default MenuItem;