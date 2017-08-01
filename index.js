'use strict';

const postcss = require('postcss');

const PLUGINS = [
  {
    option: 'rgba',
    module: require('postcss-color-rgba-fallback')
  },
  {
    option: 'opacity',
    module: require('postcss-opacity')
  },
  {
    option: 'pseudo',
    module: require('postcss-pseudoelements')
  },
  {
    option: 'vmin',
    module: require('postcss-vmin')
  },
  {
    option: 'pixrem',
    module: require('pixrem')
  },
  {
    option: 'willchange',
    module: require('postcss-will-change')
  },
  {
    option: 'reporter',
    module: require('postcss-reporter')
  },
  ],
  DEFAULTS = {
    rgba: true,
    opacity: true,
    pseudo: true,
    vmin: true,
    pixrem: true,
    willchange: true,
    reporter: false
  };

// Export PostCSS bundle
module.exports = postcss.plugin('laggard', options => {
  options = options || {};

  let config = Object.assign({}, DEFAULTS, options),
    bundle = postcss();

  PLUGINS.forEach(plugin => {
    config[plugin.option] && bundle.use(plugin.module);
  });

  return bundle;
});