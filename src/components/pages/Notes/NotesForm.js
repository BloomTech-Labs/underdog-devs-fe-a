import React, { useState } from 'react';
import {
  Modal,
  Menu,
  Space,
  Radio,
  Checkbox,
  Dropdown,
  Button,
  Input,
} from 'antd';

import {
  DownOutlined,
  UserSwitchOutlined,
  HourglassOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import './Notes.css';

const NotesForm = ({ displayModal, setDisplayModal }) => {
  const { TextArea } = Input;
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(1);
  const [content, setContent] = useState(0);

  const handleMenuClick = e => {
    setContent(e.key);
  };

  const RonChange = e => {
    setToggle(e.target.value);
  };

  const ConChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  const cType = () => {
    if (content === '1') {
      return 'Needs / resource request';
    } else if (content === '2') {
      return 'Changing Mentors';
    } else if (content === '3') {
      return 'Time sensitive needs';
    } else {
      return 'Select note type ';
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<TeamOutlined />}>
        Needs / resource request
      </Menu.Item>
      <Menu.Item key="2" icon={<UserSwitchOutlined />}>
        Changing Mentors
      </Menu.Item>
      <Menu.Item key="3" icon={<HourglassOutlined />}>
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
        <div className="notes-column-container">
          <label htmlFor="">Subject</label>
          <Dropdown overlay={menu} style={{ width: '40%' }}>
            <Button>
              {cType()} <DownOutlined />
            </Button>
          </Dropdown>
          <br />
          <label htmlFor="">Content</label>
          <TextArea
            rows={4}
            maxLength="280"
            onChange={e => setCount(e.target.value.length)}
          />
          <p className="margin-top-1">{count}/280 Characters</p>
          <br />
        </div>
        <div className="notes-column-container">
          <div className="notes-input-rows">
            <div className="radio notes-column-container">
              <label htmlFor="">Priority</label>
              <Radio.Group onChange={RonChange} value={toggle}>
                <Space direction="vertical">
                  <Radio value={1}>Urgent</Radio>
                  <Radio value={2}>Medium</Radio>
                  <Radio value={3}>Low</Radio>
                </Space>
              </Radio.Group>
            </div>

            <div className="check">
              <label htmlFor="">Who can see</label>
              <br />
              <Checkbox.Group onChange={ConChange} style={{ marginTop: '2%' }}>
                <Checkbox value={1} style={{ display: 'flex' }}>
                  {' '}
                  Admin
                </Checkbox>
                <br />
                <Checkbox value={2} style={{ display: 'flex' }}>
                  Moderator
                </Checkbox>
                <br />
                <Checkbox value={3} style={{ display: 'flex' }}>
                  Mentor
                </Checkbox>
              </Checkbox.Group>
            </div>
          </div>
          <br />

          <div className="notes-button-rows">
            <Button block={true} size="large">
              Save draft
            </Button>
            <Button type="primary" block={true} size="large">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default NotesForm;
