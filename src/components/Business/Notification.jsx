import { notification } from 'antd';

notification.config({
  placement: 'topRight',
});

export default (message, description) => {
  notification[message]({
    message,
    description,
  });
};
