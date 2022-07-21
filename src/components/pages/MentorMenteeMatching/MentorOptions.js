import { Select } from 'antd';

export const select = (edit, setMentors, mentors, data, name, nameVal) => {
  return (
    <>
      {' '}
      {edit || empty(name) ? (
        <div style={{ width: '80%' }}>
          <Select
            name={nameVal}
            onChange={value => setMentors({ ...mentors, [nameVal]: value })}
            showSearch
            style={{ width: '100%' }}
            optionFilterProp="items"
            value={name || 'Assign Mentor'}
          >
            {options(data)}
          </Select>
        </div>
      ) : (
        <div style={{ width: '80%' }}>
          <p style={{ marginLeft: '5px' }}>{name}</p>
        </div>
      )}
    </>
  );
};

export const options = data => {
  const { Option } = Select;

  return (
    <>
      <Option value="Assign Mentor">Assign Mentor</Option>
      <Option value={data.first}>{data.first}</Option>
      <Option value={data.second}>{data.second}</Option>
      <Option value={data.third}>{data.third}</Option>
    </>
  );
};

export const empty = mentor => {
  return !mentor || mentor === 'Assign Mentor';
};
