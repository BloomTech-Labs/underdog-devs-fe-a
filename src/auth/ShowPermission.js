import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ShowForPermissionComponent = props => {
  const couldShow = props.userPermissions.includes(props.permission);
  return couldShow ? props.children : null;
};

ShowForPermissionComponent.propTypes = {
  permission: PropTypes.string.isRequired,
  userPermissions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  userPermissions: state.user.permission, //<--- here you will get permissions for your user from Redux store
});

export const ShowForPermission = connect(mapStateToProps)(
  ShowForPermissionComponent
);
