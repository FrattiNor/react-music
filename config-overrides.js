const rewirePostcss = require('react-app-rewire-postcss');
const pxtorem = require('postcss-pxtorem');
module.exports = function override(config, env) {
    // do stuff with the webpack config...
    // require('react-app-rewire-postcss')(config, {
    //     plugins: loader => [
    //         require('postcss-pxtorem')({
    //             rootValue: 16,
    //             unitPrecision: 5,
    //             propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
    //             selectorBlackList: [],
    //             replace: true,
    //             mediaQuery: false,
    //             minPixelValue: 0
    //         })
    //     ]
    // });
    config = rewirePostcss(config,{
        plugins: () => [
            pxtorem({
                rootValue: 32,    //以32px为准，不同方案修改这里
                minPixelValue: 0,
            })
        ],
    });
    return config;
};