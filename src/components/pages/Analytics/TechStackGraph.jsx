import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import axios from 'axios';
import embed from 'vega-embed';

//vega-embed allows us to take a graph object, and display it on the ui.
// for more information visit https://github.com/vega/vega-embed
export default function TechStackGraph() {
  const [graphData, setGraphData] = useState({ graph: {}, description: '' });

  useEffect(() => {
    axios
      .get(`${API_URL}analytics/graph/tech`)
      .then(res => {
        setGraphData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  embed('#vis', graphData.graph);

  return (
    <>
      <h4 className="techStackGraphInfo">{graphData.description}</h4>
      <div id="vis"></div>
    </>
  );
}
