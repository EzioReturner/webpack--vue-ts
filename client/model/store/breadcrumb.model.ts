export interface CrumbState {
  crumbs: Crumbs[];
}

export interface Crumbs {
  name: string;
  path: string;
  selected: boolean;
  meta: any;
  closeable?: boolean;
  id: string;
}
