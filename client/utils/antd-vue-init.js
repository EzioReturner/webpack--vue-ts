import Vue from 'vue';
import { Button, Menu, Icon, Message, Notification, Drawer } from 'ant-design-vue';

export default function() {
  Vue.use(Button);
  Vue.use(Menu);
  Vue.use(Icon);
  Vue.use(Message);
  Vue.use(Drawer);
  Vue.prototype.$notify = Notification;
}
