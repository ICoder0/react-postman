import axios from 'axios';

import openNotification from '@/components/Business/Notification';
import Notification from '@/components/Business/Notification';

const instance = getDefaultInstance();

export function getJson(url, data) {
  return instance.get(url, { params: data });
}

export function postJson(url, data) {
  return instance.post(url, data);
}

export function deleteJson(url, data) {
  return instance.delete(url, { params: data });
}

export function putJson(url, data) {
  return instance.put(url, data);
}

export function patchJson(url, data) {
  return instance.patch(url, data);
}

export function exportFileData(url, data) {
  return getExportInstance().post(url, data);
}

function getExportInstance() {
  const exportInstance = axios.create({
    baseURL: '/',
    responseType: 'blob',
    withCredentials: true,
  });

  exportInstance.interceptors.response.use((res) => {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(res.data);
    a.href = url;
    a.download = `data${new Date().getTime() / 1000}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    return res;
  });

  return exportInstance;
}

function getDefaultInstance() {
  const instance = axios.create({
    baseURL: '/',
    withCredentials: true,
  });
  instance.interceptors.response.use(
    (res) => {
      if (res.status === 200) {
        return res.data;
      }
      return res;
    },
    (err) => {
      if (err.response.status >= 500) {
        const message = err.response.data || '服务器错误';
        openNotification('error', message);
      } else if (err.response.status > 400) {
        Notification('warning', '您没有权限')
      } else if (err.response.status) {
        openNotification(
          'error',
          `Status：${err.response.status}, Message: ${err.response.data}`,
        );
      } else {
        openNotification('error', err);
      }
      // throw err;
      return err;
    },
  );
  return instance;
}
