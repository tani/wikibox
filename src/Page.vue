<template>
    <b-container class="Page">
        <b-row>
            <b-col md="3" lg="2" class="d-none d-md-block">
                <b-card>
                    <div v-html="toc"></div>
                </b-card>
            </b-col>
            <b-col md="9" lg="10">
                <div v-html="content"></div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Marked from 'marked';
import HighlightJS from 'highlight.js';
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
        updateContent() {
            fetch(this.$route.params.file)
                .then(response=>response.text())
                .then(text=>Marked(text))
                .then(html=>{
                    this.content = html;
                    let toc = '<ul class="toc-list">';
                    const div = window.document.createElement('div');
                    div.innerHTML = html;
                    div.querySelectorAll('h1,h2,h3,h4,h5').forEach(h=>{
                        toc += `
                            <li class='toc-item toc-${h.tagName.toLowerCase()}'>
                                <a href="${window.location.hash.replace(/^(#\/.*?\/).*$/,'$1')}${h.id}">
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
             this.updateContent();
        }
    },
    mounted(){
        this.updateContent();
    },
    updated(){
        MathJaxTypeset();
    }
};
</script>