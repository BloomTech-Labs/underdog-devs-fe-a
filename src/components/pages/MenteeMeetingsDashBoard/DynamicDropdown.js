import React from 'react';
import { Select } from 'antd';

const DynamicDropdown = ({ options, placeholder, onChange }) => {
  return (
    <Select
      showSearch
      options={options}
      name="Menotr-Id"
      onChange={onChange}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{ width: 200 }}
    />
  );
};

export default DynamicDropdown;
