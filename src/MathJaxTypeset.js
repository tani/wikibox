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

export default function MathJaxTypeset() {
    MathJax
        .document(window.document, {
            InputJax: new TeX({
                packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol'],
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$','$$'], ['\\[','\\]']]
            }),
            OutputJax: new CHTML({ fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css' })
        })
        .findMath()
        .compile()
        .getMetrics()
        .typeset()
        .updateDocument()
        .clear();
}