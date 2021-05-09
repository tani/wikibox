const gulp = require("gulp");
const merge = require("merge-stream");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const esbuld = require("gulp-esbuild");
const sourcemaps = require("gulp-sourcemaps");

const themes = [
  "cerulean",
  "cosmo",
  "cyborg",
  "darkly",
  "flatly",
  "journal",
  "litera",
  "lumen",
  "lux",
  "materia",
  "minty",
  "morph",
  "pulse",
  "quartz",
  "sandstone",
  "simplex",
  "sketchy",
  "slate",
  "solar",
  "spacelab",
  "superhero",
  "united",
  "vapor",
  "yeti",
  "zephyr",
];

gulp.task("watch", () => {
  gulp.watch(["./src/**/*.js"], gulp.series("default"));
});

for (const theme of themes) {
  gulp.task(theme, () => {
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
      .pipe(gulp.dest(`./dist/${theme}/lib`));
    const woff = gulp
      .src("node_modules/mathjax-full/es5/output/chtml/fonts/woff-v2/*")
      .pipe(gulp.dest(`./dist/${theme}/lib`));
    const bsCss = gulp
      .src(require.resolve(`bootswatch/dist/${theme}/bootstrap.css`))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(rename("bootstrap.min.css"))
      .pipe(gulp.dest(`./dist/${theme}/lib`));
    const hlCss = gulp
      .src(require.resolve("highlight.js/styles/default.css"))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      .pipe(rename("highlight.min.css"))
      .pipe(gulp.dest(`./dist/${theme}/lib`));
    const md = gulp
      .src("./README.md")
      .pipe(rename("index.md"))
      .pipe(gulp.dest(`./dist/${theme}/page`));
    const html = gulp
      .src("./src/index.html")
      .pipe(gulp.dest(`./dist/${theme}`));
    const page = gulp
      .src("./src/page/*")
      .pipe(gulp.dest(`./dist/${theme}/page`));
    const archive = gulp
      .src(`./dist/${theme}/**/*`, { base: `./dist/${theme}` })
      .pipe(zip(`${theme}.zip`, { compress: false }))
      .pipe(gulp.dest("./dist/package"));
    return merge(js, woff, bsCss, hlCss, html, md, page, archive);
  });
}

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
    .pipe(gulp.dest("./dist/default/lib"));
  const bsCss = gulp
    .src(require.resolve("bootstrap/dist/css/bootstrap.css"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename("bootstrap.min.css"))
    .pipe(gulp.dest("./dist/default/lib"));
  const hlCss = gulp
    .src(require.resolve("highlight.js/styles/default.css"))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename("highlight.min.css"))
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

gulp.task("all", gulp.parallel("default", ...themes));
