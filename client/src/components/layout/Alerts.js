import React from 'react';
import { notification, Space } from 'antd';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  return (
    <Space>
      {alerts.length > 0 &&
        alerts.map(({ type, msg }) => notification[type]({ message: msg }))}
    </Space>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
