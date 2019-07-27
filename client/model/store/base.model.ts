export interface BaseState {
  collapsed: boolean;
  collapseConfig: CollapsedConfig;
}

interface CollapsedConfig {
  position?: string;
  icon?: string;
  style?: Object;
}
