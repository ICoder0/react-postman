import 'moment/locale/zh-cn';

import { Spin } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'mobx-react';
import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';

import routes from '@/routes';
import stores from '@/stores';

import styles from './App.module.less';

const WINDOW_HEIGHT = `${document.documentElement.clientHeight}px`;

const App = () => {
  return (
    <Provider stores={stores}>
      <Suspense
        fallback={
          <Spin
            size="large"
            style={{ height: WINDOW_HEIGHT }}
            className={styles.layout__loading}
          />
        }>
        <ConfigProvider locale={zhCN}>
          <Router>{renderRoutes(routes)}</Router>
        </ConfigProvider>
      </Suspense>
    </Provider>
  );
};

export default App;
