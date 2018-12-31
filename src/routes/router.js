const menuGlobal=[
    {
        name:'首页',
        path: '/index',
        component: () => import('../components/index/index'),
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