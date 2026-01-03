import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/menu.css";
import MenuItem from "../components/MenuItem.js";
import axios from "axios";

function Menu() {
  const [menu_items, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchAllMenuItems = async () => {
      try {
        const res = await axios.get(
          "https://resto-backend-qfub.onrender.com/menu_items"
        );
        setMenuItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMenuItems();
  }, []);

  const categories = [...new Set(menu_items.map((item) => item.category_name))];

  // Helper to make safe IDs
  const getCategoryId = (category) => category.replace(/\s+/g, "-");

  return (
    <div className="menu-page">
      {/* Navigation */}
      <div className="menu-section-nav">
        {categories.map((category) => (
          <a
            key={category}
            href={`#${getCategoryId(category)}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              const el = document.getElementById(getCategoryId(category));
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {category}
          </a>
        ))}
      </div>

      {/* Menu Categories */}
      {categories.map((category) => (
        <div
          key={category}
          id={getCategoryId(category)}
          className="menu-category"
        >
          <h2 className="menu-category-title">{category}</h2>
          <div className="menu-container">
            {menu_items
              .filter((item) => item.category_name === category)
              .map((item) => (
                <MenuItem
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  ingredients={item.ingredients}
                  price={item.price}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
