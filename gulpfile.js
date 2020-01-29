const gulp = require("gulp");
const webpack = require("webpack-stream");
const merge = require("merge-stream");
const zip = require("gulp-zip");

gulp.task("bootstrap", () => {
  const js = webpack(
    require("./webpack.config.js"),
    require("webpack")
  ).pipe(gulp.dest("./dist/default/lib"));
  const css = gulp.src(
    require.resolve("bootstrap/dist/css/bootstrap.min.css")
  ).pipe(gulp.dest("./dist/default/lib"));
  const html = gulp.src(
    "./src/index.html"
  ) .pipe(gulp.dest("./dist/default"));
  const page = gulp.src(
    "./src/page/*"
  ).pipe(gulp.dest("./dist/default/page"));
  const pack = gulp.src(`./dist/default/**/*`, { base: "./dist/default" })
        .pipe(zip("default.zip"))
        .pipe(gulp.dest("./dist/package"));
  return merge(js, css, html, pack);
});

const themes = ["cerulean", "darkly", "litera", "materia", "sandstone", "slate", "superhero", "cosmo", "flatly", "lumen", "minty", "simplex", "solar", "united", "cyborg", "journal", "lux", "pulse", "sketchy", "spacelab", "yeti"];

for(const theme of themes) {
  gulp.task(theme, () => {
    const template = gulp.src("./dist/default/**/*")
          .pipe(gulp.dest(`./dist/${theme}`));
    const stylesheet = gulp.src(require.resolve(`bootswatch/dist/${theme}/bootstrap.min.css`))
          .pipe(gulp.dest(`./dist/${theme}/lib`))
    const pack = gulp.src(`./dist/${theme}/**/*`, { base: `./dist/${theme}` })
          .pipe(zip(`${theme}.zip`))
          .pipe(gulp.dest("./dist/package"));
    return merge(template, stylesheet, pack);
    
  });
}

gulp.task("default", gulp.series("bootstrap", gulp.parallel(...themes)));
  
