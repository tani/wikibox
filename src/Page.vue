<!--
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
-->

<template>
    <b-container class="Page">
        <b-row>
            <b-col md="4" lg="3" class="d-none d-md-block">
                <b-card>
                    <div v-html="toc"></div>
                </b-card>
            </b-col>
            <b-col md="8" lg="9">
                <div v-html="content"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Marked from 'marked';
import HighlightJS from 'highlight.js';
import MathJaxTypeset from './MathJaxTypeset';
import 'highlight.js/styles/solarized-light.css';

Marked.setOptions({
    highlight(code) {
        return HighlightJS.highlightAuto(code).value
    }
});
export default {
    data() {
        return { 
            content: '',
            toc: ''
        }
    },
    methods: {
        updateContent(filePath) {
            fetch(filePath)
                .then(response=>response.text())
                .then(text=>Marked(text.replace(/\\([\[\]()])/g,'\\\\$1')))
                .then(html=>{
                    this.content = html;
                    let toc = '<ul class="toc-list">';
                    const div = window.document.createElement('div');
                    div.innerHTML = html;
                    div.querySelectorAll('h1,h2,h3,h4,h5').forEach(h=>{
                        toc += `
                            <li class='toc-item toc-${h.tagName.toLowerCase()}'>
                                <a href="#/${filePath}/${h.id}">
                                ${h.innerHTML}
                                </a>
                            </li>
                        `;
                    });
                    toc += '</ul>';
                    this.toc = toc;
                });
        }
    },
    watch: {
        '$route' () {
             this.updateContent(this.$route.params.file);
        }
    },
    mounted(){
        this.updateContent(this.$route.params.file);
    },
    updated(){
        MathJaxTypeset();
    }
};
</script>