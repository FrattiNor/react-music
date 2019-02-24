const rewirePostcss = require('react-app-rewire-postcss');
const pxtorem = require('postcss-pxtorem');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config) {
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
    config = injectBabelPlugin(['babel-plugin-transform-decorators-legacy', { 'legacy': true }], config)
    config = rewirePostcss(config, {
        plugins: () => [
            pxtorem({
                rootValue: 32,    //以32px为准，不同方案修改这里
                minPixelValue: 0,
                propList: ['*']
            })
        ]
    });

    return config;
};