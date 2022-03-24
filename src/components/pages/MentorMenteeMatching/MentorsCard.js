import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const MentorsCard = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const { Option } = Select;

  const [mentors, setMentors] = useState({
    first: data.Mentors.first,
    second: data.Mentors.second,
    third: data.Mentors.third,
  });

  return (
    <>
      {' '}
      <Card
        title="Mentors"
        style={{
          width: '30%',
        }}
        extra={<EditOutlined onClick={() => setEdit(!edit)} />}
      >
        {edit ? (
          <div style={{ width: '80%' }}>
            <Select
              name="first"
              onChange={value => setMentors({ ...mentors, first: value })}
              showSearch
              style={{ width: '100%' }}
              placeholder="Assign Mentor"
              value={mentors.first}
            >
              {' '}
              <Option value={data.Mentors.first}>{data.Mentors.first}</Option>
              <Option value={data.Mentors.second}>{data.Mentors.second}</Option>
              <Option value={data.Mentors.third}>{data.Mentors.third}</Option>
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p>
              {!data.Mentors.first ? (
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Assign Mentor"
                  className="mentors"
                >
                  {' '}
                  <Option value={data.Mentors.first}>
                    {data.Mentors.first}
                  </Option>
                  <Option value={data.Mentors.second}>
                    {data.Mentors.second}
                  </Option>
                  <Option value={data.Mentors.third}>
                    {data.Mentors.third}
                  </Option>
                </Select>
              ) : (
                mentors.first
              )}
            </p>
          </div>
        )}

        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <Select
              name="second"
              onChange={value => setMentors({ ...mentors, second: value })}
              showSearch
              style={{ width: '100%' }}
              optionFilterProp="children"
              placeholder="Assign Mentor"
              value={mentors.second}
            >
              <Option value={data.Mentors.first}>{data.Mentors.first}</Option>
              <Option value={data.Mentors.second}>{data.Mentors.second}</Option>
              <Option value={data.Mentors.third}>{data.Mentors.third}</Option>
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p>
              {!data.Mentors.second ? (
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Assign Mentor"
                >
                  <Option value={data.Mentors.first}>
                    {data.Mentors.first}
                  </Option>
                  <Option value={data.Mentors.second}>
                    {data.Mentors.second}
                  </Option>
                  <Option value={data.Mentors.third}>
                    {data.Mentors.third}
                  </Option>
                </Select>
              ) : (
                mentors.second
              )}
            </p>
          </div>
        )}
        {edit ? (
          <div style={{ width: '80%', marginTop: '20px' }}>
            <Select
              name="third"
              onChange={value => setMentors({ ...mentors, third: value })}
              showSearch
              style={{ width: '100%' }}
              placeholder="Assign Mentor"
              optionFilterProp="children"
              value={mentors.third}
            >
              {' '}
              <Option value={data.Mentors.first}>{data.Mentors.first}</Option>
              <Option value={data.Mentors.second}>{data.Mentors.second}</Option>
              <Option value={data.Mentors.third}>{data.Mentors.third}</Option>
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p>
              {!data.Mentors.third ? (
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Assign Mentor"
                >
                  {' '}
                  <Option value={data.Mentors.first}>
                    {data.Mentors.first}
                  </Option>
                  <Option value={data.Mentors.second}>
                    {data.Mentors.second}
                  </Option>
                  <Option value={data.Mentors.third}>
                    {data.Mentors.third}
                  </Option>
                </Select>
              ) : (
                mentors.third
              )}
            </p>
          </div>
        )}
      </Card>
    </>
  );
};

export default MentorsCard;
