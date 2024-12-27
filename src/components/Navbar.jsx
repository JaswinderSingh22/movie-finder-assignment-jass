import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FilmySearch</div>
      <div className="navbar-links">
        <a href="#home">Home</a>
        <a href="#popular">Popular</a>
        <a href="#genres">Genres</a>
        <a href="#about">About</a>
      </div>
    </nav>
  );
};

export default Navbar;