import React from "react";
import { Link } from "react-router-dom";



const PublicPrivate = () => {
  return (
    <div>
      <Link to="/" className="mr-4">Public</Link>
      <Link to="/private/fyyh856858">Private</Link>
    </div>
  );
};

export default PublicPrivate;
