import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const MentorsCard = ({ data }) => {
  const [edit, setEdit] = useState(false);

  const { Option } = Select;

  const [mentors, setMentors] = useState({
    first: '',
    second: '',
    third: '',
  });

  return (
    <>
      {' '}
      <Card
        title="Mentors"
        style={{
          width: '30%',
        }}
        extra={
          edit ? (
            <p
              onClick={() => setEdit(!edit)}
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              save
            </p>
          ) : (
            <EditOutlined
              style={{ marginTop: '2px' }}
              onClick={() => setEdit(!edit)}
            />
          )
        }
      >
        {edit ? (
          <div style={{ width: '80%' }}>
            <Select
              name="first"
              onChange={value => setMentors({ ...mentors, first: value })}
              showSearch
              style={{ width: '100%' }}
              placeholder="Assign Mentor"
              value={mentors.first || 'Assign Mentor'}
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
              {!mentors.first ? (
                <Select
                  name="first"
                  onChange={value => setMentors({ ...mentors, first: value })}
                  showSearch
                  style={{ width: '100%' }}
                  value={mentors.first || 'Assign Mentor'}
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
              value={mentors.second || 'Assign Mentor'}
            >
              <Option value={data.Mentors.first}>{data.Mentors.first}</Option>
              <Option value={data.Mentors.second}>{data.Mentors.second}</Option>
              <Option value={data.Mentors.third}>{data.Mentors.third}</Option>
            </Select>
          </div>
        ) : (
          <div style={{ width: '80%' }}>
            <p>
              {!mentors.second ? (
                <Select
                  name="second"
                  onChange={value => setMentors({ ...mentors, second: value })}
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  value={mentors.second || 'Assign Mentor'}
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
              optionFilterProp="children"
              value={mentors.third || 'Assign Mentor'}
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
              {!mentors.third ? (
                <Select
                  name="third"
                  onChange={value => setMentors({ ...mentors, third: value })}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Assign Mentor"
                  optionFilterProp="children"
                  value={mentors.third || 'Assign Mentor'}
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
