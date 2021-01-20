/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.) 'css/material-modal.min.css',
var cssFilesToInject = [
  'styles/**/*.css',
  'bootflat/css/bootflat.min.css',
  'font-awesome/css/font-awesome.min.css',
  'css/local.css',
  'css/Style_v3.css',
  'morris/morris.css',
  'css/bootstrap-material-datetimepicker.css',
];

/*
*
 'http://www.shieldui.com/shared/components/latest/css/light-bootstrap/all.min.css',
 'http://www.shieldui.com/shared/components/latest/css/dark-bootstrap/all.min.css',
* */
// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',
  'js/dependencies/**/*.js',
  'js/jquery-1.10.2.min.js',
  'bootstrap/js/bootstrap.min.js',
  'material/chart/highcharts.js',
  'material/chart/exporting.js',
  'js/dossierEtapeApp.js',
  'js/jquery-ui.min.js',
  'js/material-modal.min.js',
  'js/pikaday.js',
  // All of the rest of your client-side js files
  // will be injected here in no particular order.
 // 'js/**/*.js'
];

/*
*
 'http://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js',
 'http://www.prepbootstrap.com/Content/js/gridData.js',

* */

// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  return require('path').join('assets/',tplPath);
});


