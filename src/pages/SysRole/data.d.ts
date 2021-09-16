export type RoleItemProps = {
  roleId?: string;
  roleCode: string;
  roleName: string;
  description: string;
  createTime: Date;
  creator: string;
  editTime: Date;
  editor: string;
  checkVirusFlag: 'Y' | 'N';
};
