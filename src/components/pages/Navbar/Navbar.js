import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Underdog Devs!</h1>
      <nav>
        <Link to="/component1">component1</Link>
        <Link to="/component2">component2</Link>
        <Link to="/component3">component3</Link>
        <Link to="/component4">component4</Link>
        <Link to="/component5">component5</Link>
        <Link to="/component6">component6</Link>
        <Link to="/component7">component7</Link>
        <Link to="/component8">component8</Link>
        <Link to="/component9">component9</Link>
        <Link to="/component10">component10</Link>
      </nav>
    </div>
  );
};

export default Navbar;
