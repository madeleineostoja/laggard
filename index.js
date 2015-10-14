'use strict';

var $postcss = require('postcss');

var processors = {
      rgba: require('postcss-color-rgba-fallback'),
      opacity: require('postcss-opacity'),
      pseudo: require('postcss-pseudoelements'),
      vmin: require('postcss-vmin'),
      pixrem: require('pixrem'),
      willchange: require('postcss-will-change')
    };

// Error reporting
var reporter = require('postcss-reporter');

// Build PostCSS plugin
var laggard = $postcss.plugin('laggard', function(options) {

  var postcss = $postcss(),
      plugins = [];

  options = options || {};

  Object.keys(processors).forEach(function(feature){
    var processor = processors[feature];

    if (options[feature] !== false) {

      if (processor instanceof Array) {
        plugins = plugins.concat(processor);
      } else {
        plugins.push(processor);
      }

    }
  });

  plugins.push(reporter);

  // Build PostCSS bundle
  plugins.forEach(function(plugin){
    postcss.use(plugin);
  });

  return postcss;

});

// Export new PostCSS processor, bundled with plugins
module.exports = laggard;

module.exports.process = function(css, options) {
  options = options || {};
  options.map = options.map || (options.sourcemap ? true : null);

  var result = $postcss([laggard(options)]).process(css, options);

  // return a css string if inline/no sourcemap.
  if (options.map === null || options.map === true || options.map && options.map.inline) {
      return result.css;
  }

  // otherwise return an object of css & map
  return result;

};
