const gulp = require("gulp");
const webpack = require("webpack-stream");
const merge = require("merge-stream");

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
  ).pipe(gulp.dest("./dist/default/page"))
  return merge(js, css, html);
});

const themes = ["cerulean", "darkly", "litera", "materia", "sandstone", "slate", "superhero", "cosmo", "flatly", "lumen", "minty", "simplex", "solar", "united", "cyborg", "journal", "lux", "pulse", "sketchy", "spacelab", "yeti"];

for(const theme of themes) {
  gulp.task(theme, () => {
    const template = gulp.src("./dist/default/**/*")
          .pipe(gulp.dest(`./dist/${theme}`));
    const stylesheet = gulp.src(require.resolve(`bootswatch/dist/${theme}/bootstrap.min.css`))
          .pipe(gulp.dest(`./dist/${theme}/lib`))
    return merge(template, stylesheet);
    
  });
}

gulp.task("default", gulp.series("bootstrap", gulp.parallel(...themes)));
  
