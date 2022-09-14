import React from 'react';
import axios from 'axios';
import embed from 'vega-embed';

export default function Graph() {
  let url =
    'http://underdog-devs-ds-a-dev.us-east-1.elasticbeanstalk.com/graph/tech-stack-by-role';

  axios
    .get(url)
    .then(res => {
      const result = embed('#vis', url);
    })
    .catch(err => console.error(err));
  return (
    <>
      <div id="vis"></div>
      <p>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
    </>
  );
}
