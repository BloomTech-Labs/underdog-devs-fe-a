import { notification } from 'antd';

export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';

export const openNotificationWithIcon = (type, status, err) => {
  if (type === 'success') {
    if (status === 'approved') {
      notification[type]({
        message: 'User has been approved successfully',
      });
    } else {
      notification[type]({
        message: 'User has been rejected successfully',
      });
    }
  }

  if (type === 'error') {
    if (status === 'approved') {
      notification[type]({
        message: 'User could not be approved at this time',
        description: `Error: ${err}`,
      });
    } else {
      notification[type]({
        message: 'User could not be rejected at this time',
        description: `Error: ${err}`,
      });
    }
  }
};
