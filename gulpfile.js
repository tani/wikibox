const gulp = require("gulp");
const webpack = require("webpack-stream");
const merge = require("merge-stream");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("watch", () => {
  gulp.watch(["./src/**/*.js"], gulp.series("default"));
});

gulp.task("default", () => {
  const js = webpack(require("./webpack.config.js"), require("webpack")).pipe(
    gulp.dest("./dist/default/lib")
  );
  const woff = gulp
    .src("node_modules/mathjax-full/es5/output/chtml/fonts/woff-v2/*")
    .pipe(gulp.dest("./dist/default/lib"));
  const bsCss = gulp
    .src(require.resolve("bootstrap/dist/css/bootstrap.css"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/default/lib"));
  const hlCss = gulp
    .src(require.resolve("highlight.js/styles/default.css"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename("highlight.css"))
    .pipe(gulp.dest("./dist/default/lib"));
  const md = gulp
    .src("./README.md")
    .pipe(rename("index.md"))
    .pipe(gulp.dest("./dist/default/page"));
  const html = gulp.src("./src/index.html").pipe(gulp.dest("./dist/default"));
  const page = gulp.src("./src/page/*").pipe(gulp.dest("./dist/default/page"));
  const archive = gulp
    .src(`./dist/default/**/*`, { base: "./dist/default" })
    .pipe(zip("default.zip", { compress: false }))
    .pipe(gulp.dest("./dist/package"));
  return merge(js, woff, bsCss, hlCss, html, md, page, archive);
});
