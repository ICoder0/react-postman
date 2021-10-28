import { Layout, Menu } from 'antd';
import React, { useEffect, useMemo,useState } from 'react';
import { renderRoutes } from 'react-router-config';

import routes from '@/routes';

import styles from './index.module.less';

const { Header, Content, Footer } = Layout;

const BasicLayout = ({ route, location, history }) => {
  const { pathname } = location;
  const [path, setPath] = useState(['']);

  useEffect(() => {
    setPath(pathname.split(','));
  }, [pathname])

  const minHeight = useMemo(() => {
    return document.body.clientHeight - 64 - 70;
  }, [])

  const regsterIndex = () => history.push('/');

  return (
    <Layout id="base_layout">
      <Header>
        <div className={styles.title} onClick={regsterIndex}>React-Postman</div>
      </Header>
      <Content className={styles.content} style={{ minHeight }}>
        <div>{renderRoutes(route?.routes)}</div>
      </Content>
      <Footer className={styles.foot}>
        react-postman ©{new Date().getFullYear()} Created by Juncern
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
