import React from 'react';
import { Statistic, Row, Col, Table } from 'antd';
// TODO: add Table to the antd import and create a table per the wireframes in wireframes/NewDesignProposition/AdminWireframes/Dashboard and also refer to the Human Rights First cases dashboard for example of ant design table implementation that client likes
// HRF Ant Table code https://github.com/BloomTech-Labs/human-rights-first-asylum-fe-a/blob/main/src/components/pages/Cases/CaseTable.js
// import axiosWithAuth from '../../../utils/axiosWithAuth';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

// TODO: make Ant Design Statistics pull ticket totals from ticket tables
const Dashboard = props => {
  return (
    <div className="dashboard-container">
      <h2>Tickets Dashboard</h2>
      <div classname="dashboard-statistics">
        <Row gutter={16}>
          <Col span={5}>
            <Statistic title="Escalation Tickets" value={112893} />
          </Col>
          <Col span={5}>
            <Statistic title="Application Tickets" value={112893} />
          </Col>
          <Col span={5}>
            <Statistic title="Resource Tickets" value={112893} />
          </Col>
        </Row>
      </div>
      <div classname="dashboard-table-container">
        <Table dataSource={data} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default Dashboard;
