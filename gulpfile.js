var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    streamify = require('gulp-streamify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify');
 
gulp.task('browserify', doBundle.bind(this, './www/'));
gulp.task('server-render', doBundle.bind(this, './src/server/views/'));

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('./src/_public/*.css', function () {
        console.log('Updated css...');
        return gulp.src('./src/_public/*.css')
        .pipe(concat('css.css'))
        .pipe(gulp.dest('www/'));
    });
});

gulp.task('css-server', function () {
    gulp.watch('./src/_public/*.css', function () {
        console.log('Updated css...');
        return gulp.src('./src/server/views/*.css')
        .pipe(concat('css.css'))
        .pipe(gulp.dest('src/server/views/'));
    });
});

function doBundle(outPath) {
    var bundler = browserify({
        entries: ['./src/client/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });    
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outPath));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .on('error', function() {
        console.log('Errrr')
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('app.js'))
    .pipe(plumber())
    .pipe(buffer())
    .pipe(gulp.dest(outPath));
}

// Just running the two tasks
gulp.task('default', ['browserify', 'server-render', 'css', 'css-server']);