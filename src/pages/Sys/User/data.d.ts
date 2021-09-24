export type RoleItemProps = {
  id?: string;
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
  role: string[];
  userId?: string;
};

export type BindRoleModalProps = {
  role: string[];
};
