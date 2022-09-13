/* all commented out code is to remove the no-unused-vars warning from console */
import React, { useState } from 'react';
import { Modal, Menu, Space, Radio, Dropdown, Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';

import {
  DownOutlined,
  UserSwitchOutlined,
  HourglassOutlined,
  TeamOutlined,
  BulbFilled,
} from '@ant-design/icons';

import useAxiosWithAuth0 from '../../../hooks/useAxiosWithAuth0';
import './Memo.less';

const initialValues = {
  created_by: '',
  content_type: '',
  status: '',
  content: '',
  level: '',
  visible_to_admin: true,
  visible_to_mentor: true,
  visible_to_mentee: false,
  mentor_id: '',
  mentee_id: '',
};

const MemosForm = props => {
  const { displayModal, setDisplayModal } = props;
  const { TextArea } = Input;
  const { push } = useHistory();
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(1);
  const [subjectType, setSubjectType] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const { axiosWithAuth } = useAxiosWithAuth0();

  const postNewMemo = newMemo => {
    axiosWithAuth()
      .post('/notes', newMemo)
      .then(res => {
        push('/mymemos');
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  const handleMenuClick = e => {
    setSubjectType(e.key);
  };

  // const handleRadio = e => {
  //   setToggle(e.target.value);
  // };

  const onChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    setCount(e.target.value.length);
    setToggle(e.target.value);
  };

  const Subject = () => {
    if (subjectType === '1') {
      return 'Needs / resource request';
    } else if (subjectType === '2') {
      return 'Changing mentors';
    } else if (subjectType === '3') {
      return 'Time sensitive needs';
    } else {
      return 'Select subject ';
    }
  };

  const submitMemo = () => {
    const newMemo = {
      created_by: '00ultx74kMUmEW8054x6',
      content_type: 'type a',
      status: 'in progress',
      content: 'expect some text here',
      level: 'low',
      visible_to_admin: true,
      visible_to_mentor: true,
      visible_to_mentee: false,
      mentor_id: '00ultx74kMUmEW8054x6',
      mentee_id: '00ultwqjtqt4VCcS24x6',
    };
    postNewMemo(newMemo);
  };

  const onSubmit = e => {
    e.preventDefault();
    submitMemo();
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: '1',
          label: 'Needs / Resource request',
          icon: <TeamOutlined />,
        },
        {
          key: '2',
          label: 'Changing mentors',
          icon: <UserSwitchOutlined />,
        },
        {
          key: '3',
          label: 'Time sensitive needs',
          icon: <HourglassOutlined />,
        },
      ]}
    />
  );
  return (
    displayModal && (
      <Modal
        className="memoModal"
        title="Create a new memo"
        visible={displayModal}
        onOk={() => setDisplayModal(false)}
        onCancel={() => setDisplayModal(false)}
        footer={null}
      >
        <div className="memos-column-container">
          <label htmlFor="">Subject</label>
          <Dropdown
            name="content_type"
            onChange={onChange}
            value={Subject()}
            overlay={menu}
            style={{ width: '40%' }}
          >
            <Button>
              {Subject()} <DownOutlined />
            </Button>
          </Dropdown>
          <br />
          <label htmlFor="">Content</label>
          <TextArea
            rows={4}
            name="content"
            value={formValues.content}
            maxLength="280"
            onChange={onChange}
          />
          <p className="margin-top-1">{count}/280 Characters</p>
          <br />
        </div>
        <div className="memos-column-container">
          <div className="memos-input-rows">
            <div className="radio memos-column-container">
              <label htmlFor="">Priority</label>
              <Radio.Group name="level" onChange={onChange} value={toggle}>
                <Space direction="vertical">
                  <Radio value={1}>Urgent</Radio>
                  <Radio value={2}>Medium</Radio>
                  <Radio value={3}>Low</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <br />

          <div className="memos-button-rows">
            <Button block={true} size="large">
              Save draft
            </Button>
            <Button onClick={onSubmit} type="primary" block={true} size="large">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default MemosForm;
