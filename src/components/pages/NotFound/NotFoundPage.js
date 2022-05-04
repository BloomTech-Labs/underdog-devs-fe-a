import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundGame from '../404Game/script';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Page Not Found.</h1>

      <NotFoundGame />

      <Link to="/">
        <button>Back To Home</button>
      </Link>
      <h1> 2 left mouseclicks to jump.</h1>
    </div>
  );
};

export default NotFoundPage;
