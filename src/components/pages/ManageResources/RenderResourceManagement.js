import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Table, Grid } from 'antd';
import '../../common/styles/Resources.css';
import { SearchOutlined } from '@ant-design/icons';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import useForms from '../../../hooks/useForms';

const { TextArea } = Input;
const { useBreakpoint } = Grid;

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    //Categories are hardcoded as it sits, since they can be finite.
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
      {
        text: 'Computers',
        value: 'Computers',
      },
      {
        text: 'Office Supplies',
        value: 'Office Supplies',
      },
      {
        text: 'Electronics',
        value: 'Electronics',
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
    dataIndex: 'current_assignee',
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

const formItemLayout = {
  labelCol: {
    sm: {
      span: 6,
    },
    md: {
      span: 8,
    },
  },
  wrapperCol: {
    sm: {
      span: 15,
    },
    md: {
      span: 25,
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

const initialResourceFormValues = {
  resource_name: '',
  category: '',
  pertaians_to: '',
  message: '',
};

export const RenderResourceManagement = () => {
  const [activeTabKey, setActiveTabKey] = useState('request');
  const [resources, setResources] = useState([]);
  const { lg } = useBreakpoint();
  const { formValues, handleChange, clearForm } = useForms(
    initialResourceFormValues
  );

  useEffect(() => {
    axiosWithAuth()
      .get('/resources')
      .then(res => {
        setResources(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  //Need to add axios post to resource tickets once the BE end point accepts the correct ticket shape
  const handleResourceSubmit = e => {
    clearForm(e);
  };

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
          labelWrap
          label={
            <label style={{ color: 'black', paddingLeft: '0rem' }}>
              Resource
            </label>
          }
          value={formValues.resource_name}
          onChange={handleChange}
          rules={[{ required: true, message: 'Please input a resource name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pertains_to"
          label={
            <label style={{ color: 'black', padding: '0rem' }}>Category</label>
          }
          value={formValues.pertaians_to}
          onChange={handleChange}
          rules={[{ required: true, message: 'Please input a mentee name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="pertains_to"
          label={
            <label style={{ color: 'black', padding: '0rem' }}>Pertains</label>
          }
          value={formValues.pertaians_to}
          onChange={handleChange}
          rules={[{ required: true, message: 'Please input a mentee name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name=""
          label={
            <label style={{ color: 'black', padding: '0rem' }}>Message</label>
          }
          value={formValues.message}
          onChange={handleChange}
        >
          <TextArea />
        </Form.Item>
        <Form.Item style={{ alignSelf: 'center' }}>
          <Button onClick={handleResourceSubmit}>Submit request</Button>
        </Form.Item>
      </Form>
    ),
    assigned: <Table style={{}} columns={columns} dataSource={resources} />,
  };

  const onTabChange = key => {
    setActiveTabKey(key);
  };

  return (
    <div>
      {lg ? (
        <Card
          key="{requestResources}"
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={key => {
            onTabChange(key);
          }}
          style={{
            width: '40rem',
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
          key="{assingedResources}"
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
