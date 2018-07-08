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
            <b-col md="3" ref="parent">
                <b-list-group class="toc-list" ref="child">
                    <b-list-group-item v-for="h in toc" :key="h.to" :to="h.to" :class="h.class">
                        <span v-html="h.html"></span>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col md="9" class="offset-md-3">
                <div v-html="content" class="content"></div>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
.Page {
    padding-top: 80px;
}
@media (min-width: 768px) {
    .toc-list {
        position: fixed;
    }
}
.toc-item.toc-h1 {
    padding-left: 1em;
}
.toc-item.toc-h2 {
    padding-left: 2em;
}
.toc-item.toc-h3 {
    padding-left: 3em;
}
.toc-item.toc-h4 {
    padding-left: 4em;
}
.toc-item.toc-h5 {
    padding-left: 5em;
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
            toc: []
        }
    },
    methods: {
        updateTableOfContent(filePath) {
            const div = window.document.createElement('div');
            div.innerHTML = this.content;
            this.toc = Array.from(div.querySelectorAll('h1,h2,h3,h4,h5')).map(h=>({
                class: ['toc-item', `toc-${h.tagName.toLowerCase()}`],
                to: `/${filePath}/${h.id}`,
                html: h.innerHTML
            }));
            const style = window.getComputedStyle(this.$refs.parent);
            this.$refs.child.style.width = (this.$refs.parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)) +'px';
        },
        updateContent(filePath) {
            fetch(filePath)
                .then(response=>{
                    return response.text()
                }).then(markdown=>{
                    const div = window.document.createElement('div');
                    div.innerHTML = markdown.replace(/</mg,'&lt;').replace(/>/mg,'&gt;').replace(/```([^]*?)```/mg, (_, code)=>{
                        return '<pre><code>'+code+'</code></pre>';
                    });
                    MathJaxTypeset(div);
                    const markdownAndCommoHTML = div.innerHTML.replace(/&lt;/mg,'<').replace(/&gt;/mg,'>').replace(/<pre><code>([^]*?)<\/code><\/pre>/, (_, code)=>{
                        return '```'+code+'```';
                    });
                    this.content = Marked(markdownAndCommoHTML);
                    this.updateTableOfContent(filePath);
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
        window.addEventListener('resize',()=>{
            this.updateTableOfContent(this.$route.params.file);
        });
    }
};
</script>