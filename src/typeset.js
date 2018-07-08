/*
                                VueWiki
    ==================================================================== 
    - Homepage https://github.com/asciian/vuewiki
    - Copyright (c) 2018 TANIGUCHI Masaya All Right Reserved.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
import { MathJax } from 'mathjax3/mathjax3/mathjax.js';
import { TeX } from 'mathjax3/mathjax3/input/tex.js';
import { CHTML } from 'mathjax3/mathjax3/output/chtml.js';
import { browserAdaptor } from 'mathjax3/mathjax3/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax3/mathjax3/handlers/html.js';
import 'mathjax3/mathjax3/input/tex/base/BaseConfiguration.js';
import 'mathjax3/mathjax3/input/tex/ams/AmsConfiguration.js';
import 'mathjax3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js';
import 'mathjax3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js';
import 'mathjax3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js';

RegisterHTMLHandler(browserAdaptor());

const tex = new TeX({ packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol'], processEnvironments: true });

const chtml = new CHTML({ fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css' });

export default (...elements) => {
    MathJax
        .document(window.document, { InputJax: tex, OutputJax: chtml })
        .findMath({elements})
        .compile()
        .getMetrics()
        .typeset()
        .updateDocument()
        .clear();
}