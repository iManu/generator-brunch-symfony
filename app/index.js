'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var rmdir = require('rimraf');
var child_process = require('child_process');
var request = require('request');
var _ = require('lodash');
var Download = require('download');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    var inithero =
  '\n   ' + chalk.green("                         .                        ")
+ '\n   ' + chalk.green("                       1fft.                      ")
+ '\n   ' + chalk.green("                     1fffffft.                    ")
+ '\n   ' + chalk.green("                   1fffffffffft.                  ")
+ '\n   ' + chalk.green("                 1fffffffffffffft.                ")
+ '\n   ' + chalk.green("               1ffffffL: ;Lffffffft.              ")
+ '\n   ' + chalk.green("             1ffffffffL.  ,Lfffffffft.            ")
+ '\n   ' + chalk.green("           1ffffffffffL.   ;fffffffffft.          ")
+ '\n   ' + chalk.green("         1ffffffffffffL.   .Lffffffffffft.        ")
+ '\n   ' + chalk.green("       1fffff:Lt;f1;ffL.    ffffff.  :Lffft.      ")
+ '\n   ' + chalk.green("     1ffffff1:Lt:L1.LfL.    tffL:      tfffft.    ")
+ '\n   ' + chalk.green("   1fffffffL::L1:L1 ffL.    iff;        fffffft.  ")
+ '\n   ' + chalk.green(" 1fffffffffL.;Li,L1 tfL.    iff         :Lfffffft.")
+ '\n   ' + chalk.green(" .ffffffffff ;L:.Lt 1fL.    ;ft         .ffffffL, ")
+ '\n   ' + chalk.green("   .ffffffft .L. 1: ifL.    ;ft         .LfffL,   ")
+ '\n   ' + chalk.green("     .ffffff        1fL.    ;fL,        1ffL,     ")
+ '\n   ' + chalk.green("       .ffff1      ;LfL.    ;ffL,      1fL,       ")
+ '\n   ' + chalk.green("         .fffL,  .ffffL,    iffffL,  1fL,         ")
+ '\n   ' + chalk.green("           .ffL. fffffL.    iffffff.;L,           ")
+ '\n   ' + chalk.green("             .L,.fffffL;  ;LffffffL,              ")
+ '\n   ' + chalk.green("                .Lfffff1  fffffffL,               ")
+ '\n   ' + chalk.green("                 .ffffft  fffffL,                 ")
+ '\n   ' + chalk.green("                   .ffft .fffL,                   ")
+ '\n   ' + chalk.green("                     .ft .LL,                     ")
+ '\n   ' + chalk.green("                         .:                       ");

    var initheroDesc = '\n\n   A Yeoman generator for the Symfony2 framework, coupled with Brunch frontend tools \n\n';
    this.log(inithero);
    this.log(initheroDesc);

/*

*/


  },

  askSymfonyStandard: function () {
    var done = this.async();

    this.SymfonyStandardDistribution = {
      host: 'https://symfony.com/download?v=Symfony_Standard_Vendors_',
      commit: 'lts',
      ext: 'zip'
    };

    var prompts = [{
      type: 'confirm',
      name: 'symfonyStandard',
      message: 'Would you like to use the Symfony "Standard Edition" distribution ' + this.SymfonyStandardDistribution.commit,
      default: true
    }];

    this.prompt(prompts, function (answers) {
      if (answers.symfonyStandard) {
        this.symfonyDistribution = this.SymfonyStandardDistribution;
      } else {
        this.symfonyDistribution = null;
      }
      done();
    }.bind(this));
  },

  getTagSymfony: function () {
    var done = this.async();
    var invalidEntries = 0;

    function filterByTag(obj) {
      if ('installable' === obj || 'non_installable' === obj) {
        invalidEntries++;
        return false;
      } else {
        return true;
      }
    }

    request('https://symfony.com/versions.json', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        this.parsed = JSON.parse(body);
        var filtered = Object.keys(this.parsed);
        this.versionSf2 = filtered.filter(filterByTag);
        done();
      } else {
        console.log(chalk.red('A problem occurred'), error);
      }
    }.bind(this));
  },

  askSymfonyCustom: function () {
    if (this.symfonyDistribution === null) {
      var done = this.async();
      console.log('Please provide GitHub details of the Symfony distribution you would like to use.');

      var prompts = [{
        type: 'list',
        name: 'symfonyCommit',
        message: 'Commit (commit/branch/tag)',
        default: 'lts',
        choices: this.versionSf2
      }];

      this.prompt(prompts, function (answers) {
        this.symfonyDistribution = {
          host: 'https://symfony.com/download?v=Symfony_Standard_Vendors_',
          commit: answers.symfonyCommit,
          ext: 'zip'
        };

        done();
      }.bind(this));
    }
  },

  askBrunchCustom: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'brunchCustom',
      message: 'Customize Brunch',
      choices: [
        {
          name:  'sass-brunch',
          value: 'sassBrunch',
          checked: true
        },
        {
          name: 'postcss-brunch',
          value: 'postcssBrunch',
          checked: true
        },
        {
          name: 'uglify-js-brunch',
          value: 'uglifyJsBrunch',
          checked: true
        },
        {
          name: 'babel-brunch',
          value: 'babelBrunch',
          checked: true
        },
        {
          name: 'browser-sync-brunch',
          value: 'browserSyncBrunch',
          checked: true
        }
      ]
    }];

    this.prompt(prompts, function (answers) {
      function hasFeature(feat) {
        return answers.brunchCustom.indexOf(feat) !== -1;
      }

      this.sassBrunch = hasFeature('sassBrunch');
      this.postcssBrunch = hasFeature('postcssBrunch');
      this.uglifyJsBrunch = hasFeature('uglifyJsBrunch');
      this.babelBrunch = hasFeature('babelBrunch');
      this.browserSyncBrunch = hasFeature('browserSyncBrunch');

      done();
    }.bind(this));

  },

  askBootStrapSass: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'bootStrapSass',
      message: 'Would you like to use "BootStrap Sass"?',
      default: true
    }];

    this.prompt(prompts, function (answers) {
      this.bootStrapSass = answers.bootStrapSass;
      done();
    }.bind(this));
  },

  _unzip: function (archive, destination, opts, cb) {
    if (_.isFunction(opts) && !cb) {
      cb = opts;
      opts = { extract: true };
    }

    opts = _.assign({ extract: true }, opts);

    var log = this.log.write()
      .info('... Fetching %s ...', archive)
      .info(chalk.yellow('This might take a few moments'));

    var download = new Download(opts)
      .get(archive)
      .dest(destination)
      .use(function (res) {
        res.on('data', function () {});
      });

    download.run(function (err) {
      if (err) {
        return cb (err);
      }

      log.write().ok('Done in ' + destination).write();
      cb();
    });
  },

  symfonyBase: function () {
    var done = this.async();
    var symfonyCommit = this.parsed[this.symfonyDistribution.commit];

    var appPath = this.destinationRoot();
    var repo = this.symfonyDistribution.host + symfonyCommit  + '.' + this.symfonyDistribution.ext;

    this._unzip(repo, appPath, function (err, remote) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(' 👍 ' + chalk.green(' Download success ! '));
        done();
      }
    });
  },


  moveSymfonyBase: function () {
    var done = this.async();
    var directory = this.destinationRoot() + '/Symfony';
    this.directory(directory, '.');
    fs.move('./Symfony/', '.', function (err) {
      done();
    });
  },

  symfonyWithAsseticInstalled: function () {
    var symfonyVersionAssetic = ['2.3', '2.6', '2.7'];
    var checkVersion = symfonyVersionAssetic.indexOf(this.symfonyDistribution.commit);
    this.symfonyWithAssetic = (checkVersion !== -1) ? true : false ;
  },

  installComposer: function () {
    if (this.symfonyWithAssetic) {
      var done = this.async();
      this.pathComposer = 'php ./composer.phar';
      child_process.exec('php -r "readfile(\'https://getcomposer.org/installer\');" | php', function (error, stdout, stderr) {
        console.log(chalk.green('Installing composer locally.'));
        console.log('See ' + chalk.yellow('http://getcomposer.org')  + ' for more details on composer.');
        console.log('');
        done();
      });
    }

  },

  checkBower: function () {
    this.globalBower = false;

    if (this.bootStrapSass) {
      var done = this.async();

      child_process.execFile('bower', ['-v'], function (error, stdout, stderr) {
        if (error !== null) {
          var prompts = [{
            type: 'confirm',
            name: 'checkBower',
            message: chalk.red('WARNING: No global bower installation found. We will install it locally if you decide to continue. Continue ?'),
            default: true
          }];
          this.prompt(prompts, function (answers) {
            if (answers.checkBower) {
              child_process.exec('npm install -g bower', function (error, stdout, stderr) {
                if (error !== null) {
                  console.log('exec error: ' + error);
                } else {
                  console.log(chalk.green('Installing bower locally.'));
                  console.log('See ' + chalk.yellow('http://bower.io/') + ' for more details on bower.');
                  console.log('');
                  this.globalBower = true;
                  done();
                }
              }.bind(this));
            } else {
              console.log(chalk.red('Bower did not installed locally!'));
              done();
            }
          }.bind(this));
        } else {
          this.globalBower = true;
          done();
        }
      }.bind(this));
    }
  },

  writing: {
    removeSymfonyBase: function () {
      var done = this.async();
      var directory = this.destinationRoot() + '/Symfony';
      rmdir(directory, function (error) {
        if (null === error) {
          done();
        }
      });
    },

    app: function () {
      this.template('_brunch-config.js', 'brunch-config.js');
      if (this.sassBrunch) {
        this.directory('./demo/scss', 'app/Resources/scss');
      }
      if (this.babelBrunch) {
        this.directory('./demo/es6', 'app/Resources/js');
      }
      if (this.uglifyJsBrunch) {
        this.directory('./demo/js', 'app/Resources/js');
      }
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('./views/_base.html.twig'),
        this.destinationPath('./app/Resources/views/base.html.twig'),
        {clobber:true}
      );
      this.fs.copy(
        this.templatePath('./views/default/_index.html.twig'),
        this.destinationPath('./app/Resources/views/default/index.html.twig'),
        {clobber:true}
      );
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: {
    installComponents: function () {
      this.installDependencies({
        bower: this.globalBower,
        npm: true,
        skipInstall: false
      });
    }
  },

  end: {
    addBootStrapSass: function () {
      if (this.bootStrapSass && this.globalBower) {
        child_process.exec('bower install bootstrap-sass-official --save', function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log(chalk.green('[bootstrap-sass-official] installed!'));
          }
        });
      }
    },

    cleanConfig: function () {
      if (this.symfonyWithAssetic) {
        var confDev = yaml.safeLoad(fs.readFileSync('app/config/config_dev.yml'));
        delete confDev.assetic;
        var newConfDev = yaml.dump(confDev, {indent: 4});
        fs.writeFileSync('app/config/config_dev.yml', newConfDev);

        var conf = yaml.safeLoad(fs.readFileSync('app/config/config.yml'));
        delete conf.assetic;
        var newConf = yaml.dump(conf, {indent: 4});
        fs.writeFileSync('app/config/config.yml', newConf);
      }
    },

    updateAppKernel: function () {
      if (this.symfonyWithAssetic) {
        var appKernelPath = 'app/AppKernel.php';
        var appKernelContents = this.readFileAsString(appKernelPath);

        var newAppKernelContents = appKernelContents.replace('new Symfony\\Bundle\\AsseticBundle\\AsseticBundle(),', '');
        fs.writeFileSync(appKernelPath, newAppKernelContents);
      }
    },

    cleanComposer: function () {
      if (this.symfonyWithAssetic) {
        var removeAssetic = this.pathComposer + ' remove ' + 'symfony/assetic-bundle';

        child_process.exec(removeAssetic, function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          } else {
            console.log(chalk.green('[symfony/assetic-bundle] deleted!'));
          }
        });
      }
    },
  }
});
