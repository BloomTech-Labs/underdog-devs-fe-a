import React from 'react';
import {
  Modal,
  Menu,
  Space,
  Radio,
  Checkbox,
  message,
  Dropdown,
  Button,
  Input,
} from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const NotesForm = ({ displayModal, setDisplayModal }) => {
  const { TextArea } = Input;
  const handleMenuClick = e => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Needs / resource request
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Changing Mentors
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Time sensitive needs
      </Menu.Item>
    </Menu>
  );
  return (
    displayModal && (
      <Modal
        title="Create a new note"
        visible={displayModal}
        onOk={() => setDisplayModal(false)}
        onCancel={() => setDisplayModal(false)}
        footer={null}
      >
        <div
          className="column"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label htmlFor="">Content Type</label>
          <Dropdown overlay={menu} style={{ width: '40%' }}>
            <Button>
              Select note type <DownOutlined />
            </Button>
          </Dropdown>
          <br />
          <label htmlFor="">Content</label>
          <TextArea rows={4} />
          <br />
        </div>
        <div
          className="outer-column"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div
            className="row1"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div
              className="radio"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label htmlFor="">Level of Concern</label>
              <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                  <Radio>Option A</Radio>
                  <Radio>Option B</Radio>
                  <Radio>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>

            <div className="check">
              <label htmlFor="">Who can see</label>
              <br />
              <Checkbox.Group onChange={onChange} style={{ marginTop: '2%' }}>
                <Checkbox style={{ display: 'flex' }}> Admin</Checkbox>
                <br />
                <Checkbox style={{ display: 'flex' }}>Moderator</Checkbox>
                <br />
                <Checkbox style={{ display: 'flex' }}>Mentor</Checkbox>
              </Checkbox.Group>
            </div>
          </div>
          <br />

          <div
            className="row2"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Button style={{ minWidth: '45%', backgroundColor: '#F2692E' }}>
              Save as draft
            </Button>
            <Button style={{ minWidth: '45%', backgroundColor: '#2368AA' }}>
              Create
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default NotesForm;
