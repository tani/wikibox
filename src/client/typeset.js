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
import { MathJax } from 'mathjax3/mathjax3/mathjax';
import { TeX } from 'mathjax3/mathjax3/input/tex';
import { CHTML } from 'mathjax3/mathjax3/output/chtml';
import { browserAdaptor } from 'mathjax3/mathjax3/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax3/mathjax3/handlers/html';
import 'mathjax3/mathjax3/input/tex/base/BaseConfiguration';
import 'mathjax3/mathjax3/input/tex/ams/AmsConfiguration';
import 'mathjax3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration';
import 'mathjax3/mathjax3/input/tex/newcommand/NewcommandConfiguration';
import 'mathjax3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration';

RegisterHTMLHandler(browserAdaptor());

const tex = new TeX({ packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol'], processEnvironments: true });

const chtml = new CHTML({ fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css' });

export default (...elements) => {
  MathJax
    .document(window.document, { InputJax: tex, OutputJax: chtml })
    .findMath({ elements })
    .compile()
    .getMetrics()
    .typeset()
    .updateDocument()
    .clear();
};
