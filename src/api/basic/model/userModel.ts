export interface BackMenu {
  id: string;
  enCode: string;
  fullName: string;
  icon: string;
  linkTarget: string;
  parentId: string;
  hasChildren: boolean;
  propertyJson: string;
  sortCode: number;
  type: number;
  urlAddress: string;
  path?: string;
  children?: Nullable<BackMenu[]>;
}
