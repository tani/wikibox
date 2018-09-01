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
    <b-container>
        <header ref="header">
            <Header></Header>
        </header>
        <main ref="main">
            <router-view></router-view>
        </main>
        <footer ref="footer">
            <Footer></Footer>
        </footer>
    </b-container>
</template>
<style lang="scss">
html,
body {
  margin: 0;
}
</style>
<script lang="ts">
import Vue from "vue";
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import { some } from "fp-ts/lib/Option";
export default Vue.extend({
  components: { Header, Footer },
  mounted() {
    if (
      this.$refs.main instanceof HTMLMainElement &&
      this.$refs.header instanceof HTMLDivElement
    ) {
      const height = some(this.$refs.header)
        .mapNullable(_ => _.firstElementChild)
        .map(_ => _.clientHeight)
        .getOrElse(0);
      this.$refs.main.style.marginTop = `${height + 20}px`;
    }
  }
});
</script>
