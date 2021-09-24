export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/Login',
        hideInMenu: true,
      },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/place',
    name: '驾校管理',
    icon: 'smile',
    access: 'canAdmin',
    component: './Place',
  },
  {
    path: '/sys',
    name: '系統設置',
    icon: 'setting',
    routes: [
      {
        name: '人员管理',
        icon: 'table',
        path: '/sys/user',
        access: 'canUser',
        component: './Sys/User',
      },
      {
        name: '權限管理',
        icon: 'table',
        path: '/sys/auth',
        access: 'canAdmin',
        component: './Sys/Auth',
      },
      {
        name: '角色管理',
        icon: 'table',
        path: '/sys/role',
        access: 'canRole',
        component: './Sys/Role',
      },
      { component: './404' },
    ],
  },

  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   // access: 'canAdmin',
  //   // component: './Admin',
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
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
