import { Modal, Button, Switch } from 'antd';
import Draggable from 'react-draggable';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import SwitchablePicker from './ScheduleButton';
import { notification } from 'antd';

class Dialog extends React.Component {
  state = {
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  };

  draggleRef = React.createRef();

  openNotification = () => {
    notification.open({
      message: 'Success!',
      description: 'You have successfully scheduled your meeting!',
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.openNotification(true);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = this.draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };

  render() {
    const { bounds, disabled, visible } = this.state;
    return (
      <>
        <Button onClick={this.showModal}>Click to Schedule A Meeting</Button>
        <Modal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                });
              }}
              onFocus={() => {}}
              onBlur={() => {}}
            >
              Schedule A Meeting
            </div>
          }
          okText={'Submit'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          // modalRender={modal => (
          //   <Draggable
          //     disabled={disabled}
          //     bounds={bounds}
          //     onStart={(event, uiData) => this.onStart(event, uiData)}
          //   >
          //     <div ref={this.draggleRef}>{modal}</div>
          //   </Draggable>
          // )}
        >
          <SwitchablePicker />
        </Modal>
      </>
    );
  }
}

export default Dialog;
