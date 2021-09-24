export type AuthItemProps = {
  id: string;
  authCode: string;
  authFlag: string;
  authName: string;
  createdAt: Date;
  desc: string;
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
