<template>
    <b-container>
        <footer v-html="content">
        </footer>
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
                content: ''
            }
        },
        methods: {
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
                    });
            }
        },
        mounted() {
            this.updateContent("_footer.md");
        }
    }
</script>