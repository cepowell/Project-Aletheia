var gulp = require('gulp');
var jshint = require("gulp-jshint");

gulp.task("lint-public", function() {
    gulp.src("./public/javascripts/*/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("lint-config", function() {
    gulp.src("./config/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("lint-models", function() {
    gulp.src("./models/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task("lint-routes", function() {
    gulp.src("./routes/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

gulp.task('js', function() {
  gulp.src('sripts/*.js')
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});

gulp.task("default", ["lint-public", "lint-config", "lint-models", "lint-routes"]);
