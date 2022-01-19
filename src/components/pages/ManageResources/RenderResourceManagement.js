import React, { useState } from 'react';
import { Form, Input, Button, Card, Table, Grid } from 'antd';
import '../../common/styles/Resources.css';
import { SearchOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { useBreakpoint } = Grid;

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    filters: [
      {
        text: 'Books',
        value: 'Books',
      },
      {
        text: 'Educational',
        value: 'Educational',
      },
      {
        text: 'Subscriptions',
        value: 'Subscriptions',
      },
    ],
    onFilter: (value, record) => record.category.includes(value),
  },
  {
    title: 'Resource Name',
    dataIndex: 'resource_name',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div className="search-container">
          <Input
            autoFocus
            value={selectedKeys[0]}
            onChange={e => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          />
          <div className="search-button-group">
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        </div>
      );
    },
    filterIcon: () => {
      return <SearchOutlined className="anticon-search-main" />;
    },
    onFilter: (value, record) => {
      return record.resource_name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Assigned To',
    dataIndex: 'assigned_to',
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div className="search-container">
          <Input
            autoFocus
            value={selectedKeys[0]}
            onChange={e => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
          />
          <div className="search-button-group">
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </div>
        </div>
      );
    },
    filterIcon: () => {
      return <SearchOutlined className="anticon-search-main" />;
    },
    onFilter: (value, record) => {
      return record.assigned_to.toLowerCase().includes(value.toLowerCase());
    },
  },
];

const data = [
  {
    key: 1,
    category: 'Books',
    resource_name: 'JS Book',
    assigned_to: 'Bob',
  },
  {
    key: 2,
    category: 'Computer',
    resource_name: 'MacBook',
    assigned_to: 'John',
  },
];

const formItemLayout = {
  labelCol: {
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
  },
};

const tabList = [
  {
    key: 'request',
    tab: 'Request a resource',
  },
  {
    key: 'assigned',
    tab: 'Assigned Resources',
  },
];

const contentList = {
  request: (
    <Form
      {...formItemLayout}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <p style={{ fontWeight: 'bold', paddingLeft: '1.3rem' }}>
        Please fill this information to request a resource
      </p>
      <Form.Item
        name="resource_name"
        label="Resource Name"
        rules={[{ required: true, message: 'Please input a resource name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please input a category name' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="pertains_to"
        label="Pertains to"
        rules={[{ required: true, message: 'Please input a mentee name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="" label="Message">
        <TextArea />
      </Form.Item>
      <Form.Item style={{ alignSelf: 'center' }}>
        <Button>Submit request</Button>
      </Form.Item>
    </Form>
  ),
  assigned: <Table style={{}} columns={columns} dataSource={data} />,
};

export const RenderResourceManagement = () => {
  const [activeTabKey, setActiveTabKey] = useState('request');
  const { lg } = useBreakpoint();

  const onTabChange = key => {
    setActiveTabKey(key);
  };

  return (
    <div>
      {lg ? (
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={key => {
            onTabChange(key);
          }}
          style={{
            width: '40%',
            margin: 'auto',
          }}
          headStyle={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {contentList[activeTabKey]}
        </Card>
      ) : (
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={key => {
            onTabChange(key);
          }}
          style={{
            width: 'auto',
            height: 'auto',
          }}
          headStyle={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {contentList[activeTabKey]}
        </Card>
      )}
    </div>
  );
};
