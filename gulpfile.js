'use strict';

var async = require('async');
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var replace = require('gulp-replace');
var html2js = require('gulp-html2js');
var gif = require('gulp-if');
var env = 'development';
var buildId = Number(String(fs.readFileSync('.build')).trim());

var css = [
    './bower_components/angular-material/angular-material.css',
    './bower_components/angular-material-data-table/dist/md-data-table.min.css',
    './scss/main.scss'
];

var js = [
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/async/lib/async.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/lodash/dist/lodash.min.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-aria/angular-aria.min.js',
    './bower_components/angular-route/angular-route.min.js',
    './bower_components/angular-resource/angular-resource.min.js',
    './bower_components/angular-animate/angular-animate.min.js',
    './bower_components/angular-material/angular-material.min.js',
    './bower_components/angular-material-data-table/dist/md-data-table.min.js',
    './www/build/' + buildId + '/javascripts/partial.js',
    './javascripts/config.js',
    './javascripts/app.js',
    './javascripts/factories/orderFactory.js',
    './javascripts/factories/clientFactory.js',
    './javascripts/factories/userFactory.js',
    './javascripts/services/configService.js',
    './javascripts/services/userService.js',
    './javascripts/services/clientService.js',
    './javascripts/services/orderService.js',
    './javascripts/controllers/mainController.js',
    './javascripts/controllers/orderController.js',
    './javascripts/controllers/userController.js'
];

var bg = [
    './views/index.html'
];

var partial = [
    './partials/*.html',
    './partials/**/*.html'
];

gulp.task('partial', function() {

    return gulp.src(partial)
        .pipe(html2js('partial.js', {
            adapter: 'angular',
            base: 'templates',
            name: 'aPartial'
        }))
        .pipe(gulp.dest('./www/build/' + buildId + '/javascripts'));
});

gulp.task('html', function() {

    return gulp.src(bg)
        .pipe(replace('%env%', env))
        .pipe(replace('%build\_id%', buildId))
        .pipe(gulp.dest('./www'));
});

gulp.task('js', ['partial'], function() {

    return gulp.src(js)
        .pipe(concat('all.js'))
        .pipe(replace(/\%env\%/g, env))
        .pipe(gif(env === 'production', uglify()))
        .pipe(gulp.dest('./www/build/' + buildId + '/javascripts'));
});

gulp.task('css', function () {

    return gulp.src(css)
        .pipe(concat('all.js'))
        .pipe(sass())
        .pipe(gif(env === 'production', cleanCss({
            rebase: false
        })))
        .pipe(gulp.dest('./www/build/' + buildId + '/stylesheets'));
});

gulp.task('production', function () {

    env = 'production';

    return gulp.start('css', 'js', 'html');
});

gulp.task('default', function () {

    env = 'development';

    return gulp.start('css', 'js', 'html');
});

gulp.task('watch', function () {

    gulp.start('default');

    return watch([
        './javascripts/*',
        './javascripts/**/*',
        './views/*',
        './partials/*',
        './scss/*'
    ], function() {

        return gulp.start('default');
    });
});
