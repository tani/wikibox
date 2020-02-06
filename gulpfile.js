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

gulp.task("bootstrap", () => {
  const js = webpack(require("./webpack.config.js"), require("webpack")).pipe(
    gulp.dest("./dist/default/lib")
  );
  const css = gulp
    .src(require.resolve("bootstrap/dist/css/bootstrap.css"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/default/lib"));
  const md = gulp
    .src("./README.md")
    .pipe(rename("index.md"))
    .pipe(gulp.dest("./dist/default/page"));
  const html = gulp.src("./src/index.html").pipe(gulp.dest("./dist/default"));
  const page = gulp.src("./src/page/*").pipe(gulp.dest("./dist/default/page"));
  const archive = gulp
    .src(`./dist/default/**/*`, { base: "./dist/default" })
    .pipe(zip("default.zip"))
    .pipe(gulp.dest("./dist/package"));
  return merge(js, css, html, md, page, archive);
});

const themes = [
  "cerulean",
  "darkly",
  "litera",
  "materia",
  "sandstone",
  "slate",
  "superhero",
  "cosmo",
  "flatly",
  "lumen",
  "minty",
  "simplex",
  "solar",
  "united",
  "cyborg",
  "journal",
  "lux",
  "pulse",
  "sketchy",
  "spacelab",
  "yeti"
];

for (const theme of themes) {
  gulp.task(theme, () => {
    const js = gulp
      .src(["./dist/default/**/*.js", "./dist/default/**/*.js.map"])
      .pipe(gulp.dest(`./dist/${theme}`));
    const html = gulp
      .src("./dist/default/**/*.html")
      .pipe(gulp.dest(`./dist/${theme}`));
    const md = gulp
      .src("./dist/default/**/*.md")
      .pipe(gulp.dest(`./dist/${theme}`));
    const css = gulp
      .src(require.resolve(`bootswatch/dist/${theme}/bootstrap.css`))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(`./dist/${theme}/lib`));
    const archive = gulp
      .src(`./dist/${theme}/**/*`, { base: `./dist/${theme}` })
      .pipe(zip(`${theme}.zip`))
      .pipe(gulp.dest("./dist/package"));
    return merge(js, html, md, css, archive);
  });
}

gulp.task("default", gulp.series("bootstrap", gulp.parallel(...themes)));
