import { Select } from 'antd';

export const options = data => {
  const { Option } = Select;

  return (
    <>
      <Option value="Assign Mentor">Assign Mentor</Option>
      <Option value={data.Mentors.first}>{data.Mentors.first}</Option>
      <Option value={data.Mentors.second}>{data.Mentors.second}</Option>
      <Option value={data.Mentors.third}>{data.Mentors.third}</Option>
    </>
  );
};

export const empty = mentor => {
  return !mentor || mentor === 'Assign Mentor';
};
