const gulp = require("gulp");
const merge = require("merge-stream");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const esbuld = require("gulp-esbuild");

gulp.task("watch", () => {
  gulp.watch(["./src/**/*.js"], gulp.series("default"));
});

gulp.task("default", () => {
  const js = gulp
    .src("./src/index.js")
    .pipe(
      esbuld({
        define: {
          global: "window",
        },
        sourcemap: true,
        bundle: true,
        minify: true,
        outfile: "index.bundle.min.js",
      })
    )
    .pipe(gulp.dest("./dist/default/lib"));
  const woff = gulp
    .src("node_modules/mathjax-full/es5/output/chtml/fonts/woff-v2/*")
    .pipe(gulp.dest("./dist/default/lib/fonts"));
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
  return merge(js, woff, html, md, page, archive);
});