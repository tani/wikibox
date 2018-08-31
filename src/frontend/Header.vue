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
    <b-navbar toggleable="md" type="dark" variant="primary" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/page/index.md">{{ title }}</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <template v-for="item in navigation">
                    <b-nav-item
                      v-if="item.subnavigation.length === 0"
                      :key="item.text"
                      :href="item.href">
                        {{ item.text }}
                    </b-nav-item>
                    <b-nav-item-dropdown v-else :key="item.text" :text="item.text">
                        <b-dropdown-item
                          v-for="subitem in item.subnavigation"
                          :key="subitem.text"
                          :href="subitem.href">
                            {{ subitem.text }}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </template>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import Remarkable from 'remarkable';
import RemarkableKaTeX from 'remarkable-katex';

const remarkable = new Remarkable().use(RemarkableKaTeX);

export default {
  data() {
    return {
      title: 'Rakugaki',
      navigation: [],
    };
  },
  mounted() {
    fetch('header.md')
      .then(response => response.text())
      .then(markdown => remarkable.render(markdown))
      .then((content) => {
        const div = window.document.createElement('div');
        div.innerHTML = content;
        const h1 = div.querySelector('h1');
        this.title = h1.innerHTML;
        window.document.querySelector('title').innerHTML = h1.innerHTML;
        this.navigation = Array.from(div.querySelector('ul').children).map((item) => {
          const subnavigation = Array.from(item.querySelectorAll('li')).map((subitem) => {
            const a = subitem.querySelector('a');
            return {
              href: a.href,
              text: a.innerHTML,
            };
          });
          const a = item.querySelector('a');
          return {
            href: a.href,
            text: a.innerHTML,
            subnavigation,
          };
        });
      })
      .catch();
  },
};
</script>
