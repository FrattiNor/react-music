const menuGlobal=[
    {
        name:'首页',
        path: '/index',
        component: () => import('../components/index/index'),
    },
    {
      name:'歌曲',
      path: '/song',
      component: () => import('../components/back/index'),
    }, 
    {
      name:'歌单',
      path: '/songList',
      component: () => import('../components/back/index'),
    },
    {
      name:'歌手',
      path: '/singer',
      component: () => import('../components/back/index'),
    },
    {
      name:'歌手详情',
      path: '/singerDetail',
      component: () => import('../components/back/index'),
    },
    {
      name:'歌曲详情',
      path: '/songDetail',
      component: () => import('../components/songDetail/index'),
    },
    // {
    //     id:'ccc',
    //     pid:'0',
    //     name:'ccc页',
    //     icon:'user',
    //     path: '/ccc',
    //     models: () => [import('./models/ccc')], //models可多个
    //     component: () => import('./routes/CCC'),
    // }, 
  ];

export default menuGlobal;