import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="container">
      <nav className="navbar">
        <h1>My Blog</h1>
        <div>
          <Link to="/"> Home </Link>
          <Link to="/create" className="btn">
            {" "}
            New Post{" "}
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;
