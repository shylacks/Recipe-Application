import React from "react";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  return (
    <div className="f">
      <Link to={`/`}>Home</Link>
    </div>
  );
};

export default Sidebar;
