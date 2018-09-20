# WikiBox 
[![Build Status](https://travis-ci.org/xtaniguchimasaya/wikibox.svg?branch=master)](https://travis-ci.org/xtaniguchimasaya/wikibox)

WikiBox works on the client environment, and it is extendable because of powered by React ecosystem.
WikiBox is inspired by [MDWiki](https://mdwiki.info/). MDWiki works with jQuery and Bootstrap 3, and WikiBox modernize it using React and Bootstrap 4 to be faster and beautiful. Of course LaTeX syntaxed equations are also upgraded to KaTeX.

## Features

- LaTeX Syntax (KaTeX)
- Markdown Syntax (Remark)
- Code Highlighting (Highlight.js)
- Beautiful Themes (Bootswatch) - 21 + 1 themes are available now!
- Generating Table of Contents

## Overview

This system is made with two parts completely separated. The frontend also have rendering engine which treats markdown and LaTeX syntax, code highlighting. The frontend just communicates the backend to get auth-tokens and markdown sources. The backend just do authentification and authorization and send sources or update sources. Now we trying to make many backends implemented various languages to run on a lot of environment. First of all I prepare PHP backend. I have plan to make Common Lisp backend and JavaScript backend.

## Copyright

WikiBox has started to develop since 2018 and been written by TANIGUCHI Masaya under the GPLv3.
