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
<style>
    html, body { margin: 0; }
</style>
<script>
import Footer from './Footer.vue';
import Header from './Header.vue';

export default {
  components: { Footer, Header },
  mounted() {
    this.$refs.main.style.marginTop = `${this.$refs.header.firstElementChild.clientHeight + 20}px`;
  },
};
</script>
