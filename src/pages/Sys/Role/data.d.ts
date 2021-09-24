export type RoleItemProps = {
  id?: string;
  createdAt: Date;
  desc: string;
  placeId: string;
  roleCode: string;
  roleName: string;
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
