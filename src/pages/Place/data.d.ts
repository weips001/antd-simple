export type AuthItemProps = {
  id?: string;
  adminName: string;
  adminPhone: string;
  createdAt: Date;
  desc: string;
  isDelay: boolean;
  perioOfValidity: Date;
  placeLoaction: string;
  placeName: string;
  updatedAt: Date;
};

export type SelectProps = {
  label: string;
  value: string;
};

export type BindRoleProps = {
  auth: string[];
  roleId?: string;
};

export type BindRoleModalProps = {
  auth: string[];
};

export type PageParams = {
  current?: number;
  pageSize?: number;
};
