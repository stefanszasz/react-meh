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
 
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./src/app.js'], // Only need initial file, browserify finds the deps
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
        //.pipe(uglify())
        .pipe(gulp.dest('./www/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    }) 
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('app.js'))
    //.pipe(plumber())
    //.pipe(buffer())
    //.pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./www/'));
});

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('./src/public/*.css', function () {
        console.log('Updated css...');
        return gulp.src('src/public/*.css')
        .pipe(concat('css.css'))
        .pipe(gulp.dest('www/'));
    });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);