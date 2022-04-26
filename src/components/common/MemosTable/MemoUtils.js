import { Badge, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import * as MdIcons from 'react-icons/md';
import '../styles/Memos.css';

// Flag Icons
const statusIcon = {
  'in progress': <MdIcons.MdTimelapse size={25} color="#00B0FF" />,
  resolved: <MdIcons.MdCheckCircle size={25} color="#00C853" />,
  replied: (
    <span className="badge-container">
      <Badge count={1} offset={[2, 0]} />
    </span>
  ),
  'not submitted': <MdIcons.MdErrorOutline size={25} color="#FA8C16" />,
};

// Table Columns
export const columns = [
  {
    title: 'Mentor',
    dataIndex: 'mentor_id',
    key: 'mentor_id',
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
    title: 'Mentee',
    dataIndex: 'mentee_id',
    key: 'mentor_id',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      name,
    }) => (
      <div className="created-by-filter-menu">
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
    dataIndex: 'content_type',
    key: 'subject',
    render: subject => <span className="cell-text">{subject}</span>,
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
    title: 'Priority',
    dataIndex: 'level',
    key: 'priority',

    render: priority => (
      <div className={`flag priority-${priority}`}>{priority}</div>
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
    onFilter: (value, record) => record.level === value,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    defaultSortOrder: 'descend',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
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
      <div className="status-container">
        {statusIcon[status]}
        <span className="cell-text">{status}</span>
      </div>
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
      {
        text: 'Not Submitted',
        value: 'not submitted',
      },
    ],
    onFilter: (value, record) => record.status === value,
  },
];
