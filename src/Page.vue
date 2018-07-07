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
            <b-col md="3" class="position-relative" ref="parent">
                <b-list-group class="position-fixed" ref="child">
                    <b-list-group-item v-for="h in toc" :key="h.to" :to="h.to" :class="h.class">
                        {{ h.text }}
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col md="9" class="offset-lg-3 offset-md-4">
                <div v-html="content" class="content"></div>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
.Page {
    padding-top: 80px;
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
        updateContent(filePath) {
            fetch(filePath)
                .then(response=>{
                    return response.text()
                }).then(text=>{
                    // Markdown + TeX syntax -> Markdown + CommonHTML
                    const div = window.document.createElement('div');
                    div.innerHTML = text.replace(/</mg,'&lt;').replace(/>/mg,'&gt;').replace(/```([^]*?)```/mg, (_, code)=>{
                        return '<pre><code>'+code+'</code></pre>';
                    });
                    MathJaxTypeset(div);
                    return div.innerHTML.replace(/&lt;/mg,'<').replace(/&gt;/mg,'>').replace(/<pre><code>([^]*?)<\/code><\/pre>/, (_, code)=>{
                        return '```'+code+'```';
                    });
                }).then(text=>{
                    // Markdown + CommonHTML -> HTML
                    const div = window.document.createElement('div');
                    div.innerHTML = Marked(text);
                    this.toc = Array.from(div.querySelectorAll('h1,h2,h3,h4,h5')).map(h=>({
                        class: ['toc-item', `toc-${h.tagName.toLowerCase()}`],
                        to: `/${filePath}/${h.id}`,
                        text: h.innerHTML
                    }));
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
        const style = window.getComputedStyle(this.$refs.parent);
        this.$refs.child.style.width = this.$refs.parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        window.addEventListener('resize',()=>{
            const style = window.getComputedStyle(this.$refs.parent);
            this.$refs.child.style.width = this.$refs.parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        });
    }
};
</script>