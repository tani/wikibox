const gulp = require("gulp");
const webpack = require("webpack-stream");
const merge = require("merge-stream");
const archive = require("gulp-zip");
const rename =require("gulp-rename");

gulp.task("bootstrap", () => {
  const js = webpack(
    require("./webpack.config.js"),
    require("webpack")
  ).pipe(gulp.dest("./dist/default"));
  const css = gulp.src(
    require.resolve("bootstrap/dist/css/bootstrap.min.css")
  ).pipe(gulp.dest("./dist/default"));
  const md = gulp.src("./README.md")
        .pipe(rename("main.md"))
        .pipe(gulp.dest("./dist/default/page"));
  const html = gulp.src(
    "./src/index.html"
  ).pipe(gulp.dest("./dist/default"));
  const page = gulp.src(
    "./src/page/*"
  ).pipe(gulp.dest("./dist/default/page"));
  const zip = gulp.src(`./dist/default/**/*`, { base: "./dist/default" })
        .pipe(archive("default.zip"))
        .pipe(gulp.dest("./dist/package"));
  return merge(js, css, html, md, zip);
});

const themes = ["cerulean", "darkly", "litera", "materia", "sandstone", "slate", "superhero", "cosmo", "flatly", "lumen", "minty", "simplex", "solar", "united", "cyborg", "journal", "lux", "pulse", "sketchy", "spacelab", "yeti"];

for(const theme of themes) {
  gulp.task(theme, () => {
    const js = gulp.src("./dist/default/**/*.js")
          .pipe(gulp.dest(`./dist/${theme}`));
    const html = gulp.src("./dist/default/**/*.html")
          .pipe(gulp.dest(`./dist/${theme}`));
    const md = gulp.src("./dist/default/**/*.md")
          .pipe(gulp.dest(`./dist/${theme}`));
    const css = gulp.src(require.resolve(`bootswatch/dist/${theme}/bootstrap.min.css`))
          .pipe(gulp.dest(`./dist/${theme}`));
    const zip = gulp.src(`./dist/${theme}/**/*`, { base: `./dist/${theme}` })
          .pipe(archive(`${theme}.zip`))
          .pipe(gulp.dest("./dist/package"));
    return merge(js, html, md, css, zip);
  });
}

gulp.task("default", gulp.series("bootstrap", gulp.parallel(...themes)));
