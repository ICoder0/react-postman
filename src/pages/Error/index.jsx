import { Button, Result } from 'antd';
import React from 'react';

const Error = ({ history }) => {
  const navigatorIndexPage = () => {
    history.push('/');
  };

  return (
    <Result
      status="500"
      title="500"
      style={{ height: 772 }}
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={navigatorIndexPage}>
          Back Home
        </Button>
      }
    />
  );
};

export default Error;
