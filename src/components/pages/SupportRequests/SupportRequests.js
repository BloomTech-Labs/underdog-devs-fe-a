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
    title: 'Request',
    dataIndex: 'request',
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

const dummyData = [
  {
    ticketId: 1,
    request: 'need help',
    created_at: '03-15-2022',
  },
  {
    ticketId: 2,
    request: 'cannot find the necessary portal',
    created_at: '07-5-2022',
  },
  {
    ticketId: 3,
    request: 'i would like support regarding my application',
    created_at: '04-21-2022',
  },
];

const SupportRequests = () => {
  const data = [];

  // eslint-disable-next-line array-callback-return
  dummyData.map(t => {
    const ticketDetails = {
      key: t.ticketId,
      ticketID: t.ticketId,
      request: t.request,
      dateSubmitted: t.created_at,
    };
    data.push(ticketDetails);
  });

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
