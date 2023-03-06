import React from 'react';
import { Alert } from 'antd';

import './ErrorMessage.module.scss';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <Alert message={String(message)} type="error" showIcon closable />
    </div>
  );
};

export default ErrorMessage;