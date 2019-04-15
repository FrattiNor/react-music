const menuGlobal=[
    {
        name:'首页',
        path: '/index',
        component: () => import('../components/index/index'),
    },
    {
      name:'歌曲',
      path: '/song',
      component: () => import('../components/song/index'),
    }, 
    {
      name:'歌单',
      path: '/songList',
      component: () => import('../components/songList/index'),
    },
    {
      name:'歌手',
      path: '/singer',
      component: () => import('../components/singer/index'),
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