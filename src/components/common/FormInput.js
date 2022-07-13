import React from 'react';
import { Button, Form, Input } from 'antd';

// const FormInput = props => {
const FormInput = ({ onChange, onSubmit, submitting, onCancel, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} defaultValue={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        style={{}}
      >
        Submit
      </Button>
      {/* <Button onClick={onCancel}>Cancel</Button> */}
    </Form.Item>
  </>
);

export default FormInput;

// FormInput.propTypes = {
//   placeholder: PropTypes.string.isRequired,
//   // name: PropTypes.string.isRequired,
//   labelId: PropTypes.string.isRequired,
//   value: PropTypes.string,
//   handleInput: PropTypes.func,
// };
