var packager = require('electron-packager'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    zip = require('gulp-zip'),
    fs = require('fs'),
    del = require('del'),
    pkg = require('./package.json');


gulp.task('clean', function () {
  return del(['dist/**/*']);
});

gulp.task('dist-win', ['clean'], function () {
    packager({
      arch: 'x64',
      platform: 'win32',
      // icon: 'favicon.ico', Don't use this option if you are using Linux
      name: pkg.productName,
      overwrite: true,
      dir: './',
      out: './build',
      version: pkg.electronVersion
    }, function done (err, appPath) {
      if (err) throw err;
      console.log(`The app was compiled in ${appPath}.`);
      return gulp.src(`build/${pkg.productName}-win32-x64/**/**`)
          .pipe(zip('Windows.zip'))
          .pipe(gulp.dest('dist/'));
    });
});

gulp.task('dist-linux64', ['clean'], function () {
    packager({
      arch: 'x64',
      platform: 'linux',
      icon: 'favicon.ico',
      name: pkg.productName,
      overwrite: true,
      dir: './',
      out: './build',
      version: pkg.electronVersion
    }, function done (err, appPath) {
      if (err) throw err;
      console.log(`The app was compiled in ${appPath}.`);
      return gulp.src(`build/${pkg.productName}-linux-x64/**/**`)
          .pipe(zip('Linux64.zip'))
          .pipe(gulp.dest('dist/'));
    });
});

gulp.task('default', ['dist-win', 'dist-linux64']);
