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
<script lang="ts">
import Remarkable from "remarkable";
import Vue from "vue";
import { some } from "fp-ts/lib/Option";
const remarkable = new Remarkable().use(require("remarkable-katex"));

export default Vue.extend({
  data(): { title: string; navigation: { href: string; text: string }[] } {
    return {
      title: "Rakugaki",
      navigation: []
    };
  },
  mounted() {
    fetch("./header.md")
      .then(response => response.text())
      .then(markdown => remarkable.render(markdown))
      .then(content => {
        const div = some(document).mapNullable(_ => _.createElement("div"));
        div.map(_ => (_.innerHTML = content));
        const h1 = some(document)
          .mapNullable(_ => _.querySelector("h1"))
          .map(_ => _.innerHTML)
          .getOrElse("");
        const title = some(document)
          .mapNullable(_ => _.querySelector("title"))
          .map(_ => (_.innerHTML = h1))
          .getOrElse("");
        this.title = title;
        this.navigation = div
          .mapNullable(_ => _.querySelector("ul"))
          .map(_ =>
            Array.from(_.children).map(item => {
              const subnavigation = Array.from(item.querySelectorAll("li")).map(
                subitem => {
                  const a = some(subitem).mapNullable(_ =>
                    _.querySelector("a")
                  );
                  return {
                    href: a.map(_ => _.href).getOrElse(""),
                    text: a.map(_ => _.innerHTML).getOrElse("")
                  };
                }
              );
              const a = some(item).mapNullable(_ => _.querySelector("a"));
              return {
                href: a.map(_ => _.href).getOrElse(""),
                text: a.map(_ => _.innerHTML).getOrElse(""),
                subnavigation
              };
            })
          )
          .getOrElse([]);
      });
  }
});
</script>
