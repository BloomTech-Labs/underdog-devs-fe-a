import styled from 'styled-components';

// Flag Styling
export const Flag = styled.div`
  display: flex;
  justify-content: center;
  width: 45%;
  border-radius: 20px;
  padding: 2px;
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
  replied: '#9d4edd',
  resolved: '#48C73A',
};

// Table Columns
export const columns = [
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    key: 'visibility',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
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
  },
];
