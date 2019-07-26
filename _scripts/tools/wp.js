require('dotenv').config();
var spawn = require('child_process').spawn;
var helpers = require('../_helpers');

var container = process.env.WUXT_WP_CONTAINER || 'wp.wuxt';

helpers.checkContainers([container], function(containerRunning) {

  if (!containerRunning) {
    console.log('ERROR: ' + container + ' container is not running. Try "docker-compose up -d"')
    return;
  }


  helpers.checkWPCli(container, function(wpCliRunning) {
    if (!wpCliRunning) {

      console.log('WARNING: wp cli not installed, trying auto install ...');

      helpers.installWPCli(container, function(wpCliRunning) {

        console.log('SUCCESS: wp cli installed!');
        helpers.runWPCli(container, function() {});

      });
    } else {

      helpers.runWPCli(container, function() {});

    }
  });
});
