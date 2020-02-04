const hljs = require("highlight.js/lib/highlight");
const { expose } = require("comlink");

const resource = {};

resource[
  "highlight.js/styles/a11y-dark.css"
] = require("highlight.js/styles/a11y-dark.css");
resource[
  "highlight.js/styles/a11y-light.css"
] = require("highlight.js/styles/a11y-light.css");
resource[
  "highlight.js/styles/agate.css"
] = require("highlight.js/styles/agate.css");
resource[
  "highlight.js/styles/an-old-hope.css"
] = require("highlight.js/styles/an-old-hope.css");
resource[
  "highlight.js/styles/androidstudio.css"
] = require("highlight.js/styles/androidstudio.css");
resource[
  "highlight.js/styles/arduino-light.css"
] = require("highlight.js/styles/arduino-light.css");
resource[
  "highlight.js/styles/arta.css"
] = require("highlight.js/styles/arta.css");
resource[
  "highlight.js/styles/ascetic.css"
] = require("highlight.js/styles/ascetic.css");
resource[
  "highlight.js/styles/atelier-cave-dark.css"
] = require("highlight.js/styles/atelier-cave-dark.css");
resource[
  "highlight.js/styles/atelier-cave-light.css"
] = require("highlight.js/styles/atelier-cave-light.css");
resource[
  "highlight.js/styles/atelier-dune-dark.css"
] = require("highlight.js/styles/atelier-dune-dark.css");
resource[
  "highlight.js/styles/atelier-dune-light.css"
] = require("highlight.js/styles/atelier-dune-light.css");
resource[
  "highlight.js/styles/atelier-estuary-dark.css"
] = require("highlight.js/styles/atelier-estuary-dark.css");
resource[
  "highlight.js/styles/atelier-estuary-light.css"
] = require("highlight.js/styles/atelier-estuary-light.css");
resource[
  "highlight.js/styles/atelier-forest-dark.css"
] = require("highlight.js/styles/atelier-forest-dark.css");
resource[
  "highlight.js/styles/atelier-forest-light.css"
] = require("highlight.js/styles/atelier-forest-light.css");
resource[
  "highlight.js/styles/atelier-heath-dark.css"
] = require("highlight.js/styles/atelier-heath-dark.css");
resource[
  "highlight.js/styles/atelier-heath-light.css"
] = require("highlight.js/styles/atelier-heath-light.css");
resource[
  "highlight.js/styles/atelier-lakeside-dark.css"
] = require("highlight.js/styles/atelier-lakeside-dark.css");
resource[
  "highlight.js/styles/atelier-lakeside-light.css"
] = require("highlight.js/styles/atelier-lakeside-light.css");
resource[
  "highlight.js/styles/atelier-plateau-dark.css"
] = require("highlight.js/styles/atelier-plateau-dark.css");
resource[
  "highlight.js/styles/atelier-plateau-light.css"
] = require("highlight.js/styles/atelier-plateau-light.css");
resource[
  "highlight.js/styles/atelier-savanna-dark.css"
] = require("highlight.js/styles/atelier-savanna-dark.css");
resource[
  "highlight.js/styles/atelier-savanna-light.css"
] = require("highlight.js/styles/atelier-savanna-light.css");
resource[
  "highlight.js/styles/atelier-seaside-dark.css"
] = require("highlight.js/styles/atelier-seaside-dark.css");
resource[
  "highlight.js/styles/atelier-seaside-light.css"
] = require("highlight.js/styles/atelier-seaside-light.css");
resource[
  "highlight.js/styles/atelier-sulphurpool-dark.css"
] = require("highlight.js/styles/atelier-sulphurpool-dark.css");
resource[
  "highlight.js/styles/atelier-sulphurpool-light.css"
] = require("highlight.js/styles/atelier-sulphurpool-light.css");
resource[
  "highlight.js/styles/atom-one-dark-reasonable.css"
] = require("highlight.js/styles/atom-one-dark-reasonable.css");
resource[
  "highlight.js/styles/atom-one-dark.css"
] = require("highlight.js/styles/atom-one-dark.css");
resource[
  "highlight.js/styles/atom-one-light.css"
] = require("highlight.js/styles/atom-one-light.css");
resource[
  "highlight.js/styles/brown-paper.css"
] = require("highlight.js/styles/brown-paper.css");
resource[
  "highlight.js/styles/codepen-embed.css"
] = require("highlight.js/styles/codepen-embed.css");
resource[
  "highlight.js/styles/color-brewer.css"
] = require("highlight.js/styles/color-brewer.css");
resource[
  "highlight.js/styles/darcula.css"
] = require("highlight.js/styles/darcula.css");
resource[
  "highlight.js/styles/dark.css"
] = require("highlight.js/styles/dark.css");
resource[
  "highlight.js/styles/darkula.css"
] = require("highlight.js/styles/darkula.css");
resource[
  "highlight.js/styles/default.css"
] = require("highlight.js/styles/default.css");
resource[
  "highlight.js/styles/docco.css"
] = require("highlight.js/styles/docco.css");
resource[
  "highlight.js/styles/dracula.css"
] = require("highlight.js/styles/dracula.css");
resource[
  "highlight.js/styles/far.css"
] = require("highlight.js/styles/far.css");
resource[
  "highlight.js/styles/foundation.css"
] = require("highlight.js/styles/foundation.css");
resource[
  "highlight.js/styles/github-gist.css"
] = require("highlight.js/styles/github-gist.css");
resource[
  "highlight.js/styles/github.css"
] = require("highlight.js/styles/github.css");
resource[
  "highlight.js/styles/gml.css"
] = require("highlight.js/styles/gml.css");
resource[
  "highlight.js/styles/googlecode.css"
] = require("highlight.js/styles/googlecode.css");
resource[
  "highlight.js/styles/grayscale.css"
] = require("highlight.js/styles/grayscale.css");
resource[
  "highlight.js/styles/gruvbox-dark.css"
] = require("highlight.js/styles/gruvbox-dark.css");
resource[
  "highlight.js/styles/gruvbox-light.css"
] = require("highlight.js/styles/gruvbox-light.css");
resource[
  "highlight.js/styles/hopscotch.css"
] = require("highlight.js/styles/hopscotch.css");
resource[
  "highlight.js/styles/hybrid.css"
] = require("highlight.js/styles/hybrid.css");
resource[
  "highlight.js/styles/idea.css"
] = require("highlight.js/styles/idea.css");
resource[
  "highlight.js/styles/ir-black.css"
] = require("highlight.js/styles/ir-black.css");
resource[
  "highlight.js/styles/isbl-editor-dark.css"
] = require("highlight.js/styles/isbl-editor-dark.css");
resource[
  "highlight.js/styles/isbl-editor-light.css"
] = require("highlight.js/styles/isbl-editor-light.css");
resource[
  "highlight.js/styles/kimbie.dark.css"
] = require("highlight.js/styles/kimbie.dark.css");
resource[
  "highlight.js/styles/kimbie.light.css"
] = require("highlight.js/styles/kimbie.light.css");
resource[
  "highlight.js/styles/lightfair.css"
] = require("highlight.js/styles/lightfair.css");
resource[
  "highlight.js/styles/magula.css"
] = require("highlight.js/styles/magula.css");
resource[
  "highlight.js/styles/mono-blue.css"
] = require("highlight.js/styles/mono-blue.css");
resource[
  "highlight.js/styles/monokai-sublime.css"
] = require("highlight.js/styles/monokai-sublime.css");
resource[
  "highlight.js/styles/monokai.css"
] = require("highlight.js/styles/monokai.css");
resource[
  "highlight.js/styles/night-owl.css"
] = require("highlight.js/styles/night-owl.css");
resource[
  "highlight.js/styles/nord.css"
] = require("highlight.js/styles/nord.css");
resource[
  "highlight.js/styles/obsidian.css"
] = require("highlight.js/styles/obsidian.css");
resource[
  "highlight.js/styles/ocean.css"
] = require("highlight.js/styles/ocean.css");
resource[
  "highlight.js/styles/paraiso-dark.css"
] = require("highlight.js/styles/paraiso-dark.css");
resource[
  "highlight.js/styles/paraiso-light.css"
] = require("highlight.js/styles/paraiso-light.css");
resource[
  "highlight.js/styles/pojoaque.css"
] = require("highlight.js/styles/pojoaque.css");
resource[
  "highlight.js/styles/purebasic.css"
] = require("highlight.js/styles/purebasic.css");
resource[
  "highlight.js/styles/qtcreator_dark.css"
] = require("highlight.js/styles/qtcreator_dark.css");
resource[
  "highlight.js/styles/qtcreator_light.css"
] = require("highlight.js/styles/qtcreator_light.css");
resource[
  "highlight.js/styles/railscasts.css"
] = require("highlight.js/styles/railscasts.css");
resource[
  "highlight.js/styles/rainbow.css"
] = require("highlight.js/styles/rainbow.css");
resource[
  "highlight.js/styles/routeros.css"
] = require("highlight.js/styles/routeros.css");
resource[
  "highlight.js/styles/school-book.css"
] = require("highlight.js/styles/school-book.css");
resource[
  "highlight.js/styles/shades-of-purple.css"
] = require("highlight.js/styles/shades-of-purple.css");
resource[
  "highlight.js/styles/solarized-dark.css"
] = require("highlight.js/styles/solarized-dark.css");
resource[
  "highlight.js/styles/solarized-light.css"
] = require("highlight.js/styles/solarized-light.css");
resource[
  "highlight.js/styles/sunburst.css"
] = require("highlight.js/styles/sunburst.css");
resource[
  "highlight.js/styles/tomorrow-night-blue.css"
] = require("highlight.js/styles/tomorrow-night-blue.css");
resource[
  "highlight.js/styles/tomorrow-night-bright.css"
] = require("highlight.js/styles/tomorrow-night-bright.css");
resource[
  "highlight.js/styles/tomorrow-night-eighties.css"
] = require("highlight.js/styles/tomorrow-night-eighties.css");
resource[
  "highlight.js/styles/tomorrow-night.css"
] = require("highlight.js/styles/tomorrow-night.css");
resource[
  "highlight.js/styles/tomorrow.css"
] = require("highlight.js/styles/tomorrow.css");
resource["highlight.js/styles/vs.css"] = require("highlight.js/styles/vs.css");
resource[
  "highlight.js/styles/vs2015.css"
] = require("highlight.js/styles/vs2015.css");
resource[
  "highlight.js/styles/xcode.css"
] = require("highlight.js/styles/xcode.css");
resource[
  "highlight.js/styles/xt256.css"
] = require("highlight.js/styles/xt256.css");
resource[
  "highlight.js/styles/zenburn.css"
] = require("highlight.js/styles/zenburn.css");
resource[
  "highlight.js/lib/languages/1c.js"
] = require("highlight.js/lib/languages/1c.js");
resource[
  "highlight.js/lib/languages/abnf.js"
] = require("highlight.js/lib/languages/abnf.js");
resource[
  "highlight.js/lib/languages/accesslog.js"
] = require("highlight.js/lib/languages/accesslog.js");
resource[
  "highlight.js/lib/languages/actionscript.js"
] = require("highlight.js/lib/languages/actionscript.js");
resource[
  "highlight.js/lib/languages/ada.js"
] = require("highlight.js/lib/languages/ada.js");
resource[
  "highlight.js/lib/languages/angelscript.js"
] = require("highlight.js/lib/languages/angelscript.js");
resource[
  "highlight.js/lib/languages/apache.js"
] = require("highlight.js/lib/languages/apache.js");
resource[
  "highlight.js/lib/languages/applescript.js"
] = require("highlight.js/lib/languages/applescript.js");
resource[
  "highlight.js/lib/languages/arcade.js"
] = require("highlight.js/lib/languages/arcade.js");
resource[
  "highlight.js/lib/languages/arduino.js"
] = require("highlight.js/lib/languages/arduino.js");
resource[
  "highlight.js/lib/languages/armasm.js"
] = require("highlight.js/lib/languages/armasm.js");
resource[
  "highlight.js/lib/languages/asciidoc.js"
] = require("highlight.js/lib/languages/asciidoc.js");
resource[
  "highlight.js/lib/languages/aspectj.js"
] = require("highlight.js/lib/languages/aspectj.js");
resource[
  "highlight.js/lib/languages/autohotkey.js"
] = require("highlight.js/lib/languages/autohotkey.js");
resource[
  "highlight.js/lib/languages/autoit.js"
] = require("highlight.js/lib/languages/autoit.js");
resource[
  "highlight.js/lib/languages/avrasm.js"
] = require("highlight.js/lib/languages/avrasm.js");
resource[
  "highlight.js/lib/languages/awk.js"
] = require("highlight.js/lib/languages/awk.js");
resource[
  "highlight.js/lib/languages/axapta.js"
] = require("highlight.js/lib/languages/axapta.js");
resource[
  "highlight.js/lib/languages/bash.js"
] = require("highlight.js/lib/languages/bash.js");
resource[
  "highlight.js/lib/languages/basic.js"
] = require("highlight.js/lib/languages/basic.js");
resource[
  "highlight.js/lib/languages/bnf.js"
] = require("highlight.js/lib/languages/bnf.js");
resource[
  "highlight.js/lib/languages/brainfuck.js"
] = require("highlight.js/lib/languages/brainfuck.js");
resource[
  "highlight.js/lib/languages/cal.js"
] = require("highlight.js/lib/languages/cal.js");
resource[
  "highlight.js/lib/languages/capnproto.js"
] = require("highlight.js/lib/languages/capnproto.js");
resource[
  "highlight.js/lib/languages/ceylon.js"
] = require("highlight.js/lib/languages/ceylon.js");
resource[
  "highlight.js/lib/languages/clean.js"
] = require("highlight.js/lib/languages/clean.js");
resource[
  "highlight.js/lib/languages/clojure-repl.js"
] = require("highlight.js/lib/languages/clojure-repl.js");
resource[
  "highlight.js/lib/languages/clojure.js"
] = require("highlight.js/lib/languages/clojure.js");
resource[
  "highlight.js/lib/languages/cmake.js"
] = require("highlight.js/lib/languages/cmake.js");
resource[
  "highlight.js/lib/languages/coffeescript.js"
] = require("highlight.js/lib/languages/coffeescript.js");
resource[
  "highlight.js/lib/languages/coq.js"
] = require("highlight.js/lib/languages/coq.js");
resource[
  "highlight.js/lib/languages/cos.js"
] = require("highlight.js/lib/languages/cos.js");
resource[
  "highlight.js/lib/languages/cpp.js"
] = require("highlight.js/lib/languages/cpp.js");
resource[
  "highlight.js/lib/languages/crmsh.js"
] = require("highlight.js/lib/languages/crmsh.js");
resource[
  "highlight.js/lib/languages/crystal.js"
] = require("highlight.js/lib/languages/crystal.js");
resource[
  "highlight.js/lib/languages/cs.js"
] = require("highlight.js/lib/languages/cs.js");
resource[
  "highlight.js/lib/languages/csp.js"
] = require("highlight.js/lib/languages/csp.js");
resource[
  "highlight.js/lib/languages/css.js"
] = require("highlight.js/lib/languages/css.js");
resource[
  "highlight.js/lib/languages/d.js"
] = require("highlight.js/lib/languages/d.js");
resource[
  "highlight.js/lib/languages/dart.js"
] = require("highlight.js/lib/languages/dart.js");
resource[
  "highlight.js/lib/languages/delphi.js"
] = require("highlight.js/lib/languages/delphi.js");
resource[
  "highlight.js/lib/languages/diff.js"
] = require("highlight.js/lib/languages/diff.js");
resource[
  "highlight.js/lib/languages/django.js"
] = require("highlight.js/lib/languages/django.js");
resource[
  "highlight.js/lib/languages/dns.js"
] = require("highlight.js/lib/languages/dns.js");
resource[
  "highlight.js/lib/languages/dockerfile.js"
] = require("highlight.js/lib/languages/dockerfile.js");
resource[
  "highlight.js/lib/languages/dos.js"
] = require("highlight.js/lib/languages/dos.js");
resource[
  "highlight.js/lib/languages/dsconfig.js"
] = require("highlight.js/lib/languages/dsconfig.js");
resource[
  "highlight.js/lib/languages/dts.js"
] = require("highlight.js/lib/languages/dts.js");
resource[
  "highlight.js/lib/languages/dust.js"
] = require("highlight.js/lib/languages/dust.js");
resource[
  "highlight.js/lib/languages/ebnf.js"
] = require("highlight.js/lib/languages/ebnf.js");
resource[
  "highlight.js/lib/languages/elixir.js"
] = require("highlight.js/lib/languages/elixir.js");
resource[
  "highlight.js/lib/languages/elm.js"
] = require("highlight.js/lib/languages/elm.js");
resource[
  "highlight.js/lib/languages/erb.js"
] = require("highlight.js/lib/languages/erb.js");
resource[
  "highlight.js/lib/languages/erlang-repl.js"
] = require("highlight.js/lib/languages/erlang-repl.js");
resource[
  "highlight.js/lib/languages/erlang.js"
] = require("highlight.js/lib/languages/erlang.js");
resource[
  "highlight.js/lib/languages/excel.js"
] = require("highlight.js/lib/languages/excel.js");
resource[
  "highlight.js/lib/languages/fix.js"
] = require("highlight.js/lib/languages/fix.js");
resource[
  "highlight.js/lib/languages/flix.js"
] = require("highlight.js/lib/languages/flix.js");
resource[
  "highlight.js/lib/languages/fortran.js"
] = require("highlight.js/lib/languages/fortran.js");
resource[
  "highlight.js/lib/languages/fsharp.js"
] = require("highlight.js/lib/languages/fsharp.js");
resource[
  "highlight.js/lib/languages/gams.js"
] = require("highlight.js/lib/languages/gams.js");
resource[
  "highlight.js/lib/languages/gauss.js"
] = require("highlight.js/lib/languages/gauss.js");
resource[
  "highlight.js/lib/languages/gcode.js"
] = require("highlight.js/lib/languages/gcode.js");
resource[
  "highlight.js/lib/languages/gherkin.js"
] = require("highlight.js/lib/languages/gherkin.js");
resource[
  "highlight.js/lib/languages/glsl.js"
] = require("highlight.js/lib/languages/glsl.js");
resource[
  "highlight.js/lib/languages/gml.js"
] = require("highlight.js/lib/languages/gml.js");
resource[
  "highlight.js/lib/languages/go.js"
] = require("highlight.js/lib/languages/go.js");
resource[
  "highlight.js/lib/languages/golo.js"
] = require("highlight.js/lib/languages/golo.js");
resource[
  "highlight.js/lib/languages/gradle.js"
] = require("highlight.js/lib/languages/gradle.js");
resource[
  "highlight.js/lib/languages/groovy.js"
] = require("highlight.js/lib/languages/groovy.js");
resource[
  "highlight.js/lib/languages/haml.js"
] = require("highlight.js/lib/languages/haml.js");
resource[
  "highlight.js/lib/languages/handlebars.js"
] = require("highlight.js/lib/languages/handlebars.js");
resource[
  "highlight.js/lib/languages/haskell.js"
] = require("highlight.js/lib/languages/haskell.js");
resource[
  "highlight.js/lib/languages/haxe.js"
] = require("highlight.js/lib/languages/haxe.js");
resource[
  "highlight.js/lib/languages/hsp.js"
] = require("highlight.js/lib/languages/hsp.js");
resource[
  "highlight.js/lib/languages/htmlbars.js"
] = require("highlight.js/lib/languages/htmlbars.js");
resource[
  "highlight.js/lib/languages/http.js"
] = require("highlight.js/lib/languages/http.js");
resource[
  "highlight.js/lib/languages/hy.js"
] = require("highlight.js/lib/languages/hy.js");
resource[
  "highlight.js/lib/languages/inform7.js"
] = require("highlight.js/lib/languages/inform7.js");
resource[
  "highlight.js/lib/languages/ini.js"
] = require("highlight.js/lib/languages/ini.js");
resource[
  "highlight.js/lib/languages/irpf90.js"
] = require("highlight.js/lib/languages/irpf90.js");
resource[
  "highlight.js/lib/languages/isbl.js"
] = require("highlight.js/lib/languages/isbl.js");
resource[
  "highlight.js/lib/languages/java.js"
] = require("highlight.js/lib/languages/java.js");
resource[
  "highlight.js/lib/languages/javascript.js"
] = require("highlight.js/lib/languages/javascript.js");
resource[
  "highlight.js/lib/languages/jboss-cli.js"
] = require("highlight.js/lib/languages/jboss-cli.js");
resource[
  "highlight.js/lib/languages/json.js"
] = require("highlight.js/lib/languages/json.js");
resource[
  "highlight.js/lib/languages/julia-repl.js"
] = require("highlight.js/lib/languages/julia-repl.js");
resource[
  "highlight.js/lib/languages/julia.js"
] = require("highlight.js/lib/languages/julia.js");
resource[
  "highlight.js/lib/languages/kotlin.js"
] = require("highlight.js/lib/languages/kotlin.js");
resource[
  "highlight.js/lib/languages/lasso.js"
] = require("highlight.js/lib/languages/lasso.js");
resource[
  "highlight.js/lib/languages/ldif.js"
] = require("highlight.js/lib/languages/ldif.js");
resource[
  "highlight.js/lib/languages/leaf.js"
] = require("highlight.js/lib/languages/leaf.js");
resource[
  "highlight.js/lib/languages/less.js"
] = require("highlight.js/lib/languages/less.js");
resource[
  "highlight.js/lib/languages/lisp.js"
] = require("highlight.js/lib/languages/lisp.js");
resource[
  "highlight.js/lib/languages/livecodeserver.js"
] = require("highlight.js/lib/languages/livecodeserver.js");
resource[
  "highlight.js/lib/languages/livescript.js"
] = require("highlight.js/lib/languages/livescript.js");
resource[
  "highlight.js/lib/languages/llvm.js"
] = require("highlight.js/lib/languages/llvm.js");
resource[
  "highlight.js/lib/languages/lsl.js"
] = require("highlight.js/lib/languages/lsl.js");
resource[
  "highlight.js/lib/languages/lua.js"
] = require("highlight.js/lib/languages/lua.js");
resource[
  "highlight.js/lib/languages/makefile.js"
] = require("highlight.js/lib/languages/makefile.js");
resource[
  "highlight.js/lib/languages/markdown.js"
] = require("highlight.js/lib/languages/markdown.js");
resource[
  "highlight.js/lib/languages/mathematica.js"
] = require("highlight.js/lib/languages/mathematica.js");
resource[
  "highlight.js/lib/languages/matlab.js"
] = require("highlight.js/lib/languages/matlab.js");
resource[
  "highlight.js/lib/languages/maxima.js"
] = require("highlight.js/lib/languages/maxima.js");
resource[
  "highlight.js/lib/languages/mel.js"
] = require("highlight.js/lib/languages/mel.js");
resource[
  "highlight.js/lib/languages/mercury.js"
] = require("highlight.js/lib/languages/mercury.js");
resource[
  "highlight.js/lib/languages/mipsasm.js"
] = require("highlight.js/lib/languages/mipsasm.js");
resource[
  "highlight.js/lib/languages/mizar.js"
] = require("highlight.js/lib/languages/mizar.js");
resource[
  "highlight.js/lib/languages/mojolicious.js"
] = require("highlight.js/lib/languages/mojolicious.js");
resource[
  "highlight.js/lib/languages/monkey.js"
] = require("highlight.js/lib/languages/monkey.js");
resource[
  "highlight.js/lib/languages/moonscript.js"
] = require("highlight.js/lib/languages/moonscript.js");
resource[
  "highlight.js/lib/languages/n1ql.js"
] = require("highlight.js/lib/languages/n1ql.js");
resource[
  "highlight.js/lib/languages/nginx.js"
] = require("highlight.js/lib/languages/nginx.js");
resource[
  "highlight.js/lib/languages/nimrod.js"
] = require("highlight.js/lib/languages/nimrod.js");
resource[
  "highlight.js/lib/languages/nix.js"
] = require("highlight.js/lib/languages/nix.js");
resource[
  "highlight.js/lib/languages/nsis.js"
] = require("highlight.js/lib/languages/nsis.js");
resource[
  "highlight.js/lib/languages/objectivec.js"
] = require("highlight.js/lib/languages/objectivec.js");
resource[
  "highlight.js/lib/languages/ocaml.js"
] = require("highlight.js/lib/languages/ocaml.js");
resource[
  "highlight.js/lib/languages/openscad.js"
] = require("highlight.js/lib/languages/openscad.js");
resource[
  "highlight.js/lib/languages/oxygene.js"
] = require("highlight.js/lib/languages/oxygene.js");
resource[
  "highlight.js/lib/languages/parser3.js"
] = require("highlight.js/lib/languages/parser3.js");
resource[
  "highlight.js/lib/languages/perl.js"
] = require("highlight.js/lib/languages/perl.js");
resource[
  "highlight.js/lib/languages/pf.js"
] = require("highlight.js/lib/languages/pf.js");
resource[
  "highlight.js/lib/languages/pgsql.js"
] = require("highlight.js/lib/languages/pgsql.js");
resource[
  "highlight.js/lib/languages/php.js"
] = require("highlight.js/lib/languages/php.js");
resource[
  "highlight.js/lib/languages/plaintext.js"
] = require("highlight.js/lib/languages/plaintext.js");
resource[
  "highlight.js/lib/languages/pony.js"
] = require("highlight.js/lib/languages/pony.js");
resource[
  "highlight.js/lib/languages/powershell.js"
] = require("highlight.js/lib/languages/powershell.js");
resource[
  "highlight.js/lib/languages/processing.js"
] = require("highlight.js/lib/languages/processing.js");
resource[
  "highlight.js/lib/languages/profile.js"
] = require("highlight.js/lib/languages/profile.js");
resource[
  "highlight.js/lib/languages/prolog.js"
] = require("highlight.js/lib/languages/prolog.js");
resource[
  "highlight.js/lib/languages/properties.js"
] = require("highlight.js/lib/languages/properties.js");
resource[
  "highlight.js/lib/languages/protobuf.js"
] = require("highlight.js/lib/languages/protobuf.js");
resource[
  "highlight.js/lib/languages/puppet.js"
] = require("highlight.js/lib/languages/puppet.js");
resource[
  "highlight.js/lib/languages/purebasic.js"
] = require("highlight.js/lib/languages/purebasic.js");
resource[
  "highlight.js/lib/languages/python.js"
] = require("highlight.js/lib/languages/python.js");
resource[
  "highlight.js/lib/languages/q.js"
] = require("highlight.js/lib/languages/q.js");
resource[
  "highlight.js/lib/languages/qml.js"
] = require("highlight.js/lib/languages/qml.js");
resource[
  "highlight.js/lib/languages/r.js"
] = require("highlight.js/lib/languages/r.js");
resource[
  "highlight.js/lib/languages/reasonml.js"
] = require("highlight.js/lib/languages/reasonml.js");
resource[
  "highlight.js/lib/languages/rib.js"
] = require("highlight.js/lib/languages/rib.js");
resource[
  "highlight.js/lib/languages/roboconf.js"
] = require("highlight.js/lib/languages/roboconf.js");
resource[
  "highlight.js/lib/languages/routeros.js"
] = require("highlight.js/lib/languages/routeros.js");
resource[
  "highlight.js/lib/languages/rsl.js"
] = require("highlight.js/lib/languages/rsl.js");
resource[
  "highlight.js/lib/languages/ruby.js"
] = require("highlight.js/lib/languages/ruby.js");
resource[
  "highlight.js/lib/languages/ruleslanguage.js"
] = require("highlight.js/lib/languages/ruleslanguage.js");
resource[
  "highlight.js/lib/languages/rust.js"
] = require("highlight.js/lib/languages/rust.js");
resource[
  "highlight.js/lib/languages/sas.js"
] = require("highlight.js/lib/languages/sas.js");
resource[
  "highlight.js/lib/languages/scala.js"
] = require("highlight.js/lib/languages/scala.js");
resource[
  "highlight.js/lib/languages/scheme.js"
] = require("highlight.js/lib/languages/scheme.js");
resource[
  "highlight.js/lib/languages/scilab.js"
] = require("highlight.js/lib/languages/scilab.js");
resource[
  "highlight.js/lib/languages/scss.js"
] = require("highlight.js/lib/languages/scss.js");
resource[
  "highlight.js/lib/languages/shell.js"
] = require("highlight.js/lib/languages/shell.js");
resource[
  "highlight.js/lib/languages/smali.js"
] = require("highlight.js/lib/languages/smali.js");
resource[
  "highlight.js/lib/languages/smalltalk.js"
] = require("highlight.js/lib/languages/smalltalk.js");
resource[
  "highlight.js/lib/languages/sml.js"
] = require("highlight.js/lib/languages/sml.js");
resource[
  "highlight.js/lib/languages/sqf.js"
] = require("highlight.js/lib/languages/sqf.js");
resource[
  "highlight.js/lib/languages/sql.js"
] = require("highlight.js/lib/languages/sql.js");
resource[
  "highlight.js/lib/languages/stan.js"
] = require("highlight.js/lib/languages/stan.js");
resource[
  "highlight.js/lib/languages/stata.js"
] = require("highlight.js/lib/languages/stata.js");
resource[
  "highlight.js/lib/languages/step21.js"
] = require("highlight.js/lib/languages/step21.js");
resource[
  "highlight.js/lib/languages/stylus.js"
] = require("highlight.js/lib/languages/stylus.js");
resource[
  "highlight.js/lib/languages/subunit.js"
] = require("highlight.js/lib/languages/subunit.js");
resource[
  "highlight.js/lib/languages/swift.js"
] = require("highlight.js/lib/languages/swift.js");
resource[
  "highlight.js/lib/languages/taggerscript.js"
] = require("highlight.js/lib/languages/taggerscript.js");
resource[
  "highlight.js/lib/languages/tap.js"
] = require("highlight.js/lib/languages/tap.js");
resource[
  "highlight.js/lib/languages/tcl.js"
] = require("highlight.js/lib/languages/tcl.js");
resource[
  "highlight.js/lib/languages/tex.js"
] = require("highlight.js/lib/languages/tex.js");
resource[
  "highlight.js/lib/languages/thrift.js"
] = require("highlight.js/lib/languages/thrift.js");
resource[
  "highlight.js/lib/languages/tp.js"
] = require("highlight.js/lib/languages/tp.js");
resource[
  "highlight.js/lib/languages/twig.js"
] = require("highlight.js/lib/languages/twig.js");
resource[
  "highlight.js/lib/languages/typescript.js"
] = require("highlight.js/lib/languages/typescript.js");
resource[
  "highlight.js/lib/languages/vala.js"
] = require("highlight.js/lib/languages/vala.js");
resource[
  "highlight.js/lib/languages/vbnet.js"
] = require("highlight.js/lib/languages/vbnet.js");
resource[
  "highlight.js/lib/languages/vbscript-html.js"
] = require("highlight.js/lib/languages/vbscript-html.js");
resource[
  "highlight.js/lib/languages/vbscript.js"
] = require("highlight.js/lib/languages/vbscript.js");
resource[
  "highlight.js/lib/languages/verilog.js"
] = require("highlight.js/lib/languages/verilog.js");
resource[
  "highlight.js/lib/languages/vhdl.js"
] = require("highlight.js/lib/languages/vhdl.js");
resource[
  "highlight.js/lib/languages/vim.js"
] = require("highlight.js/lib/languages/vim.js");
resource[
  "highlight.js/lib/languages/x86asm.js"
] = require("highlight.js/lib/languages/x86asm.js");
resource[
  "highlight.js/lib/languages/xl.js"
] = require("highlight.js/lib/languages/xl.js");
resource[
  "highlight.js/lib/languages/xml.js"
] = require("highlight.js/lib/languages/xml.js");
resource[
  "highlight.js/lib/languages/xquery.js"
] = require("highlight.js/lib/languages/xquery.js");
resource[
  "highlight.js/lib/languages/yaml.js"
] = require("highlight.js/lib/languages/yaml.js");
resource[
  "highlight.js/lib/languages/zephir.js"
] = require("highlight.js/lib/languages/zephir.js");

expose({
  render(code, language, theme) {
    hljs.registerLanguage(
      language,
      resource[`highlight.js/lib/languages/${language}.js`]
    );
    return `
        <style>${resource[`highlight.js/styles/${theme}.css`].default}</style>
        <pre><code>${hljs.highlight(language, code).value}</code></pre>
      `;
  }
});
