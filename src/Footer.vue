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
    <b-container>
        <footer v-html="content">
        </footer>
    </b-container>
</template>
<script>
import render from './render';
import handleResponse from './handleResponse';

export default {
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    fetch('footer.md')
      .then(response => handleResponse(response))
      .then((markdown) => { this.content = render(markdown); })
      .catch((/* reason */) => { /* console.log(reason); */ });
  },
};
</script>
