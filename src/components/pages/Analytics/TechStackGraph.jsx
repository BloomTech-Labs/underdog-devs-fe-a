import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import axios from 'axios';
import embed from 'vega-embed';
import { connect } from 'react-redux';

//vega-embed allows us to take a graph object, and display it on the ui.
// for more information visit https://github.com/vega/vega-embed
function TechStackGraph({ themeRedux }) {
  const [graphData, setGraphData] = useState({ graph: {}, description: '' });

  useEffect(() => {
    axios
      .post(`${API_URL}analytics/graph/tech`, { theme: themeRedux })
      .then(res => {
        setGraphData(res.data);
      })
      .catch(err => console.error(err));
  }, [themeRedux]);

  embed('#vis', graphData.graph);

  return (
    <>
      <h4 className="techStackGraphInfo">{graphData.description}</h4>
      <div id="vis"></div>
    </>
  );
}

const mapStateToProps = state => {
  return { themeRedux: state.theme.theme };
};

export default connect(mapStateToProps)(TechStackGraph);
