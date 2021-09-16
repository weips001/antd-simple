export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          { name: '登录', path: '/user/login', component: './user/Login' },
        ],
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: '二级管理页',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     { component: './404' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { name: '系統角色', icon: 'table', path: '/sysrole', component: './SysRole' },
  { name: '系統配置', icon: 'table', path: '/system', component: './System' },
  { name: '系統人員', icon: 'table', path: '/sysuser', component: './SysUser' },
  {
    name: '文件類型',
    icon: 'table',
    path: '/filetype',
    component: './FileType',
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
