export interface BaseState {
  collapsed: boolean;
  collapseConfig: CollapsedConfig;
  loading: boolean;
}

interface CollapsedConfig {
  position?: string;
  icon?: string;
  style?: Object;
}
