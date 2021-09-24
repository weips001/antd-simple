export type RoleItemProps = {
  id: string;
  desc: string;
  name: string;
  password: string;
  phone: string;
  placeId: string;
  status: '0' | '1';
  token: string;
  createdAt: Date;
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
