import { Button, Result } from 'antd';
import React from 'react';

const MoMatch = ({ history }) => {
  const navigatorIndexPage = () => {
    history.push('/');
  };

  return (
    <Result
      status="404"
      title="404"
      style={{ height: 772 }}
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={navigatorIndexPage}>
          Back Home
        </Button>
      }
    />
  );
};

export default MoMatch;
