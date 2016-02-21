/**
 * Build System for React-Native
 *
 *  gulp
 *    default build for sim environment
 *
 *  gulp --env {sim|device|prod|qa}
 *    build for specific environment
 */
var gulp = require('gulp');
var replace = require('gulp-replace');
var log = require('gulp-util').log;
var os = require('os');
var shell = require('gulp-shell');
var args = require('yargs').argv;
var validators = require('./config/validators');

var fs = require('fs')
var path = require('path');

var interfaces = os.networkInterfaces();
// Optionally, pass in --env [device/dev/prod] to override
var currentEnvironment = process.env.NODE_ENV || args.env || 'sim';
// get environment object
var environment = require('./config/environments.js')[currentEnvironment];
// get ipAddress
var ipAddress = environment.IP_ADDRESS;

// init gulp process
init();

/**
 * task: default
 */
gulp.task('default', ['run-react'], function() {

});

/**
 * task: update-app-delegate
 *  updates /ios/gainsville/AppDelegate.m with correct ip per environment
 */
gulp.task('update-app-delegate', function() {
  if (currentEnvironment !== 'qa' && currentEnvironment !== 'prod') {
    replaceLocalHost('ios/gainsville/AppDelegate.m', ipAddress);
  } else {
    log('Building for ' + currentEnvironment + ', skipping AppDelegate.m update');
  }
});

/**
 * task: update-rct-websocket-executor
 *  updates /node_modules/react-native/Libraries/WebSocket/RCTWebSocketExecutor.m with correct ip
 *  per environment
 */
gulp.task('update-rct-websocket-executor', function() {
  if (currentEnvironment !== 'qa' && currentEnvironment !== 'prod') {
    replaceLocalHost('node_modules/react-native/Libraries/WebSocket/RCTWebSocketExecutor.m', ipAddress);
  } else {
    log('Building for ' + currentEnvironment + ', skipping RCTWebSocketExecutor.m update');
  }
});

/**
 * task: run-react
 *  starts the react-native packager
 */
gulp.task('run-react',
  ['build-environment', 'update-app-delegate', 'update-rct-websocket-executor'], shell.task([
    //'react-native bundle --minify --entry-file index.ios.js --bundle-output ios/main.jsbundle',
    //'npm start'
  ]));

/**
 * task: build-environment
 *  creates an environment.js constant file
 */
gulp.task('build-environment', function() {
  // remove any props we don't need in react app
  var env = environment;
  delete env.IP_ADDRESS;

  // build environment constant
  fs.writeFileSync(path.join('./src/common/constants/', 'environment.js'),
    'module.exports = ' + JSON.stringify(env) + '\;\
    ');

  // Swap out localhost if we are in device mode
  if (currentEnvironment === 'device') {
    return gulp.src(['./src/common/constants/environment.js'], {base: './'})
      .pipe(replace('http://localhost:1337', ipAddress.replace(':8081', ':1337')))
      .pipe(replace('http://localhost:1338', ipAddress.replace(':8081', ':1338')))
      .pipe(gulp.dest('./'));
  } else {
    return;
  }

});

/**
 * initialize gulp process - get ipAddress if needed
 */
function init() {
  log('running ' + currentEnvironment.toUpperCase() + ' build');

  // get IP from local machine
  if (!ipAddress) {
    // get protocol and port
    var protocol = process.env.PROTOCOL || 'http://';
    var port = process.env.PORT || '8081';
    // build ipAddress
    ipAddress = protocol + findLocalIPAddress() + ':' + port;
  }
}

/**
 * returns local ipAddress for device debugging
 */
function findLocalIPAddress() {
  var ip;
  Object.keys(interfaces).forEach(function(interfaceName) {
    // grab the IPv4 the en0 key
    interfaces[interfaceName].forEach(function(interface) {
      if (interfaceName === 'en0' && interface.family === 'IPv4') {
        log('Found ifconfig entry: ' + JSON.stringify(interface));
        ip = interface.address;
      }
    });
  });
  return ip;
}

/**
 * replaces existing url entries with corresponding environment ip
 */
function replaceLocalHost(file, ipAddress) {
  log('Updating iOS file: ' + file);
  var urlRegEx = new RegExp(validators['url']);
  // As of RN 0.16, RCTwebSocketExecutor does not need a port
  var newIp = 'http://' +  ipAddress.replace('http://','').split(':')[0];

  /**
   * replace existing url in file
   */
  fs.readFile(file, 'utf8', function(err, words) {
    var matches = words.match(urlRegEx);
    if (matches) {
      var oldIp = matches[0];
      return gulp
        .src([file], {base: './'})
        .pipe(replace(oldIp, newIp))
        .pipe(gulp.dest('./'))
        .on('finish', function() {
          log('Replaced ' + oldIp + ' with ' + newIp + ' in: ' + file);
        });
    } else if(words.indexOf('localhost') > -1) {
      if (ipAddress.indexOf('localhost') < 0) {
        return gulp
          .src([file], {base: './'})
          .pipe(replace('http://localhost', newIp))
          .pipe(gulp.dest('./'))
          .on('finish', function() {
            log('Replaced localhost with ' + newIp + ' in: ' + file);
          });
      } else {
        log(file + ' is already set to localhost. Skipping.');
      }

    } else {
      log('Could not find a matching expression in: ' + file);
    }
  });
}
