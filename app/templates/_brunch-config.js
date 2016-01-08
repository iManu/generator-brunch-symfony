'use strict';

exports.config = {
  paths: {
    'public': 'web',
    'watched': ['app/Resources']
  },
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^(?!app)/,
      }
    },
    stylesheets: {
      joinTo: 'css/style.css'
    }
  },
  conventions: {
    ignored: [
      /\/_/, // File beginning by "_" like _settings.scss
      // Brunch does include all Bower components by default, we blacklist unneeded ones.
      //'bower_components/foundation/'
    ],
    assets: /^app\/Resources\/assets/
  },
  plugins: {
    <% if (babelBrunch) { %>
    babel: {
      pattern: /\.(js|jsx)$/
    },<% } %><% if (sassBrunch) { %>
    sass: {
      allowCache: true
    },<% } %><% if (uglifyJsBrunch) { %>
    uglify: {
      mangle: true,
      compress: {
        global_defs: {
          DEBUG: false
        }
      }
    },<% } %>
    cleancss: {
      keepSpecialComments: 0,
      removeEmpty: true
    }<% if (postcssBrunch) { %>,
    postcss: {
      processors: [
        require('autoprefixer')(['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']),
        require('csswring')
      ]
    }<% } %><% if (browserSyncBrunch) { %>,
    browserSync: {
      logLevel: 'debug',
      files: ['web/css/style.css', 'web/js/*.js', 'app/Resources/views/**/*.twig'],
      proxy: '127.0.0.1:8000',
      open: false,
      notify: true
    }<% } %>
  }
};
