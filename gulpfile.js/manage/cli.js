var gulp = require('gulp');
var spawn = require('child_process').spawn;
var helpers = require('../_helpers');

gulp.task( 'wuxt-wp', function(done) {

  helpers.checkContainers(['wp.wuxt'], function(containerRunning) {

    if (!containerRunning) {
      console.log('ERROR: wp.wuxt container is not running. Try "docker-compose up -d"')
      return done();
    }


    helpers.checkWPCli('wp.wuxt', function(wpCliRunning) {
      if (!wpCliRunning) {

        console.log('WARNING: wp cli not installed, trying auto install ...');

        helpers.installWPCli('wp.wuxt', function(wpCliRunning) {

          console.log('SUCCESS: wp cli installed!');
          helpers.runWPCli('wp.wuxt', done);

        });
      } else {

        helpers.runWPCli('wp.wuxt', done);

      }
    });
  });

});
