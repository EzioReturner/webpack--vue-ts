export interface MenuModel {
  name: string;
  icon: string;
  path: string;
  component: any;
  children?: any;
  authority?: string[];
  meta?: any;
}

export interface CollapseConfig {
  icon: string;
  style: Object;
  position: string;
}
