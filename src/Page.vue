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
<style>
.Page {
    margin-top: 30px;
}
.toc-list {
    padding-left: 1em;
}
.toc-item.toc-h1 {
    margin-left: 1em;
}
.toc-item.toc-h2 {
    margin-left: 2em;
}
.toc-item.toc-h3 {
    margin-left: 3em;
}
.toc-item.toc-h4 {
    margin-left: 4em;
}
.toc-item.toc-h5 {
    margin-left: 5em;
}
</style>
<script>
import Marked from 'marked';
import HighlightJS from 'highlight.js';
import 'highlight.js/styles/solarized-light.css';
import MathJaxTypeset from './MathJaxTypeset';

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
                .then(response=>{
                    return response.text()
                }).then(text=>{
                    const div = window.document.createElement('div');
                    div.innerHTML = text.replace(/</mg,'&lt;').replace(/>/mg,'&gt;').replace(/```([^]*?)```/mg, (_, code)=>{
                        return '<pre><code>'+code+'</code></pre>';
                    });
                    MathJaxTypeset(div);
                    return div.innerHTML.replace(/&lt;/mg,'<').replace(/&gt;/mg,'>').replace(/<pre><code>([^]*?)<\/code><\/pre>/, (_, code)=>{
                        return '```'+code+'```';
                    });
                }).then(text=>{
                    const div = window.document.createElement('div');
                    div.innerHTML = Marked(text);
                    this.toc = Array
                                .from(div.querySelectorAll('h1,h2,h3,h4,h5'))
                                .map(h=>`<li class='toc-item toc-${h.tagName.toLowerCase()}'><a href="#/${filePath}/${h.id}">${h.innerHTML}</a></li>`)
                                .concat('</ul>')
                                .reduce((ul, li)=>ul+li,'<ul class="toc-list">');
                    this.content = div.innerHTML;
                });
        }
    },
    watch: {
        '$route' () {
             this.updateContent(this.$route.params.file);
        }
    },
    mounted () {
        this.updateContent(this.$route.params.file);
    }
};
</script>