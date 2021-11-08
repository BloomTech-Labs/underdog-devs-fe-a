import React from 'react';
import { Button } from 'antd';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Underdog Devs!</h1>
      <nav>
        <Button type="link" href="/examplefeature">
          Feature1
        </Button>
        <Button type="link" href="/examplefeature">
          Feature2
        </Button>
        <Button type="link" href="/examplefeature">
          Feature3
        </Button>
        <Button type="link" href="/examplefeature">
          Feature4
        </Button>
        <Button type="link" href="/examplefeature">
          Feature5
        </Button>
      </nav>
    </div>
  );
};

export default Navbar;
