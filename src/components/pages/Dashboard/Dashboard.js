import React, { useEffect, useState } from 'react';
import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import { Statistic, Row, Col, Table } from 'antd';
// TODO: update page styling and functionality, see wireframes/NewDesignProposition/AdminWireframes/Dashboard

const columns = [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketID',
    filters: [
      {
        text: 'Example',
        value: 'Example',
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
    onFilter: (value, record) => record.ticketID.indexOf(value) === 0,
    sorter: (a, b) => a.ticketID - b.ticketID,
    sortDirections: ['descend'],
  },
  {
    title: 'Message',
    dataIndex: 'message',
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

    onFilter: (value, record) => record.ticketType.indexOf(value) === 0,
  },
  {
    title: 'Date Submitted',
    dataIndex: 'dateSubmitted',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.dateSubmitted < b.dateSubmitted,
  },
];

function onChange(pagination, filters, sorter, extra) {
  // console.log('params', pagination, filters, sorter, extra);
}

// TODO: make Ant Design Statistics pull ticket totals from ticket tables
const Dashboard = props => {
  const [tickets, setTickets] = useState([]);
  const { axiosWithAuth } = useAxiosWithAuth0();

  useEffect(() => {
    const getTickets = () => {
      axiosWithAuth()
        .get('/resource-tickets')
        .then(res => {
          if (res.data.message === null) {
            setTickets(res.data);
          }
        });
    };
    getTickets();
  }, []);

  const data = [];
  let escaTickets = [];
  if (tickets !== []) {
    escaTickets = tickets.filter(x => x.ticket_status === 'approved');
  }
  // console.log('escaTickets', escaTickets);
  // eslint-disable-next-line array-callback-return
  tickets.map(t => {
    const ticketDetails = {
      key: t.ticket_id,
      ticketID: t.ticket_id,
      message: t.ticket_subject,
      // dateSubmitted: t.created_at.substring(0, 10),
    };
    data.push(ticketDetails);
  });
  return (
    <div className="dashboard-container">
      <h2>Tickets Dashboard</h2>
      <div className="dashboard-statistics">
        <Row gutter={16}>
          <Col span={5}>
            <Statistic title="Escalation Tickets" value={escaTickets.length} />
          </Col>
          <Col span={5}>
            <Statistic
              title="Application Tickets"
              value={tickets.length - escaTickets.length}
            />
          </Col>
          <Col span={5}>
            <Statistic title="Resource Tickets" value={tickets.length} />
          </Col>
        </Row>
      </div>
      <div className="dashboard-table-container">
        <Table dataSource={data} columns={columns} onChange={onChange} />
      </div>
    </div>
  );
};

export default Dashboard;
