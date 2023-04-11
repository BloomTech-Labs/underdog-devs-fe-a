import { Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

function Filter() {
  const [selectedItems, setSelectedItems] = useState([]);

  function handleSelectChange(value) {
    setSelectedItems(value);
  }

  return (
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select app type"
      onChange={handleSelectChange}
    >
      <Option value="pending">pending</Option>
      <Option value="approved">approved</Option>
      <Option value="rejected">rejected</Option>
    </Select>
  );
}

export default Filter;
