<!--
                                Rakugaki
    ====================================================================
    - Homepage https://github.com/asciian/Rakugaki
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
    <b-row>
        <b-col md="3" order-md="2" class="d-none d-md-block">
            <div class="sidebar">
                <b-button-toolbar>
                    <b-button-group class="mr-2">
                        <b-button v-on:click="$router.push(`/history/${filename}`)">
                            History
                        </b-button>
                        <b-button v-on:click="$router.push(`/edit/${filename}`)">
                            Edit
                        </b-button>
                        <b-button v-on:click="$router.push(`/delete/${filename}`)">
                            Delete
                        </b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button v-on:click="$router.push(`/create/`)">
                            Create
                        </b-button>
                    </b-button-group>
                </b-button-toolbar>
                <b-list-group class="toc-list">
                    <b-list-group-item v-for="h in toc" :key="h.to" :to="h.to" :class="h.class">
                        <span v-html="h.html"></span>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </b-col>
        <b-col md="9" order-md="1">
            <b-card><div v-html="content"></div></b-card>
        </b-col>
    </b-row>
</template>
<style>
.sidebar{
    position: fixed;
}
.toc-list {
    margin-top: 20px;
}
.toc-item-h1 > span {
    padding-left: 0em;
}
.toc-item-h2 > span {
    padding-left: 1em;
}
.toc-item-h3 > span {
    padding-left: 2em;
}
.toc-item-h4 > span {
    padding-left: 3em;
}
.toc-item-h5 > span {
    padding-left: 4em;
}
.toc-item-h6 > span {
    padding-left: 5em;
}
</style>
<script>
import Remarkable from 'remarkable';
import RemarkableKaTeX from 'remarkable-katex';
import HighlightJS from 'highlight.js';
import slugify from 'slugify';

const remarkable = new Remarkable({
  highlight(str) {
    return HighlightJS.highlightAuto(str).value;
  },
}).use(RemarkableKaTeX).use(({ renderer }) => {
  // eslint-disable-next-line no-param-reassign
  renderer.rules.heading_open = (tokens, idx) => `<h${tokens[idx].hLevel} id="${slugify(tokens[idx + 1].content.toLowerCase())}">`;
});

export default {
  props: ['filename'],
  data() {
    return {
      content: '',
      toc: [],
    };
  },
  methods: {
    updateContent(filePath) {
      fetch(filePath)
        .then(response => response.text())
        .then(markdown => remarkable.render(markdown))
        .then((html) => {
          const div = window.document.createElement('div');
          div.innerHTML = html;
          this.content = html;
          this.toc = Array.from(div.querySelectorAll('h1,h2,h3,h4,h5')).map(h => ({
            class: [`toc-item-${h.tagName.toLowerCase()}`],
            to: `/page/${filePath}/${h.id}`,
            html: h.innerHTML,
          }));
        });
    },
  },
  watch: {
    $route() {
      this.updateContent(this.filename);
    },
  },
  mounted() {
    this.updateContent(this.filename);
  },
};
</script>
