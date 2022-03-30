import styled from 'styled-components';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Flag Styling
export const Flag = styled.div`
  display: flex;
  justify-content: center;
  width: 45%;
  border-radius: 20px;
  padding: 2px 1em;
  font-size: 12px;
  font-weight: bold;
  text-transform: capitalize;
  opacity: 0.8;
  color: #000;
`;

// Flag colors
export const subjectColor = {
  needs: '#EBD671',
  'job search': '#6FB2D2',
  other: '#E5DCC3',
};

export const visibilityColor = {
  mentor: '#1BAE9F',
  admin: '#D3455B',
};

export const priorityColor = {
  urgent: '#FF6B6B',
  medium: '#FFD93D',
  low: '#6BCB77',
};

export const statusColor = {
  'in progress': '#2D88D9',
  draft: '#E8833B',
  replied: '#9964C4',
  resolved: '#48C73A',
};

// Table Columns
export const columns = [
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      name,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          autoFocus
          placeholder="Search by user"
          value={selectedKeys[0]}
          onChange={e => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
          onPressEnter={() => {
            confirm();
          }}
          onBlur={() => {
            confirm();
          }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => confirm()}
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            type="danger"
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record.createdBy.toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
    render: subject => (
      <Flag style={{ backgroundColor: subjectColor[subject] }}>{subject}</Flag>
    ),
    filters: [
      {
        text: 'Needs',
        value: 'needs',
      },
      {
        text: 'Job Search',
        value: 'job search',
      },
      {
        text: 'Other',
        value: 'other', //Unsure what the api will return, for mentor
      },
    ],
    onFilter: (value, record) => record.subject === value,
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    key: 'visibility',
    render: visibility => (
      <Flag style={{ backgroundColor: visibilityColor[visibility] }}>
        {visibility}
      </Flag>
    ),
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',

    render: priority => (
      <Flag style={{ backgroundColor: priorityColor[priority] }}>
        {priority}
      </Flag>
    ),
    filters: [
      {
        text: 'Urgent',
        value: 'urgent',
      },
      {
        text: 'Medium',
        value: 'medium',
      },
      {
        text: 'Low',
        value: 'low',
      },
    ],
    onFilter: (value, record) => record.priority === value,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    sortDirections: ['ascend', 'descend'],
    sorter: (a, b) => new Date(b.date) - new Date(a.date),
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Flag style={{ backgroundColor: statusColor[status] }}>{status}</Flag>
    ),
    filters: [
      {
        text: 'In Progress',
        value: 'in progress',
      },
      {
        text: 'Resolved',
        value: 'resolved',
      },
      {
        text: 'Replied',
        value: 'replied',
      },
    ],
    onFilter: (value, record) => record.status === value,
  },
];
