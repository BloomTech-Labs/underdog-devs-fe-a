import React from 'react';
import { Calendar, Badge } from 'antd';
import 'antd/dist/antd.css';

const VAMC = props => {
  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  return (
    <>
      <Calendar onPanelChange={onPanelChange} />
    </>
  );
};

export default VAMC;
