import React from 'react';
import { Statistic, Row, Col, Table } from 'antd';

const columns = [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketID',
    sorter: (a, b) => a.ticketID - b.ticketID,
    sortDirections: ['descend'],
  },
  {
    title: 'Message',
    dataIndex: 'message',
  },
  {
    title: 'Date Submitted',
    dataIndex: 'dateSubmitted',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.dateSubmitted < b.dateSubmitted,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

const SupportRequests = () => {
  const data = [];

  return (
    <div className="dashboard-container">
      <h2>Support Requests</h2>
      <div className="dashboard-statistics">
        <Row gutter={16}>
          <Col span={5}>
            <Statistic title="# of Requests" value={99} />
          </Col>
        </Row>
      </div>
      <div className="dashboard-table-container">
        <Table dataSource={data} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default SupportRequests;
