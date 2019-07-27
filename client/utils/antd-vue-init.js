import Vue from 'vue';
import { Button, Menu, Icon, Message, Notification } from 'ant-design-vue';

export default function() {
  Vue.use(Button);
  Vue.use(Menu);
  Vue.use(Icon);
  Vue.use(Message);
  Vue.prototype.$notify = Notification;
}
