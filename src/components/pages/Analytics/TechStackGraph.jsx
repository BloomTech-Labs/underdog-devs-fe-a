import axios from 'axios';
import React, { useEffect } from 'react';
import embed from 'vega-embed';
export default function TechStackGraph() {
  // let url = `${process.env.REACT_APP_DS_API_URL}/graph/tech-stack-by-role`;
  let url =
    'http://underdog-devs-ds-a-dev.us-east-1.elasticbeanstalk.com/graph/tech-stack-by-role';
  // embed is an asynchronous api call, resolves in a promise
  // for more information visit https://github.com/vega/vega-embed

  useEffect(() => {
    axios.get(`${url}`).then(function (res) {
      const graphImage = res.data.graph;
      var graphDescription = res.data.description;
      embed('#vis', graphImage);
    });
  });

  return (
    <>
      <div id="vis"></div>
      <p className="techStackGraphInfo">
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
