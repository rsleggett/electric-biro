var gulp = require('gulp');
var minmist = require('minimist');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

var args = minmist(process.argv.slice(2));

gulp.task('deploy', function() {
    var remotePath = args.ftpfolder;
    var conn = ftp.create({
        host: args.ftphost,
        user: args.ftpuser,
        password: args.ftppassword,
        log: gutil.log
    });
    console.log(conn);
    console.log(gulp.src('./build/bundled/**'));
    gulp.src('./build/bundled/**')
        .pipe(conn.newer(remotePath))
        .pipe(conn.dest(remotePath));
});