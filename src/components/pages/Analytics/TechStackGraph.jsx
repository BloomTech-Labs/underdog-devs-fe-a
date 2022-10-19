import React, { useEffect, useState } from 'react';
import axios from 'axios';
import embed from 'vega-embed';
//vega-embed allows us to take a graph object, and display it on the ui.
// for more information visit https://github.com/vega/vega-embed

export default function TechStackGraph() {
  const [graphData, setGraphData] = useState({ graph: {}, description: '' });
  // let url = `${process.env.REACT_APP_DS_API_URL}/graph/tech-stack-by-role`;
  const url =
    'http://underdog-devs-ds-a-dev.us-east-1.elasticbeanstalk.com/graph/tech-stack-by-role';

  useEffect(() => {
    axios.get(`${url}`).then(function (res) {
      setGraphData(res.data);
    });
  }, url);
  embed('#vis', graphData.graph);

  return (
    <>
      <div id="vis"></div>
      <p className="techStackGraphInfo">{graphData.description}</p>
    </>
  );
}
