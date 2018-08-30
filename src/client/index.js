/*
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
*/
import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import Page from './Page.vue';
import Edit from './Edit.vue';
import Create from './Create.vue';
// import History from './History.vue';
// import Delete from './Delete.vue';

require('highlight.js/styles/solarized-light.css');
// eslint-disable-next-line import/no-dynamic-require,no-undef
require(`bootswatch/dist/${THEME}/bootstrap.css`);

Vue.use(BootstrapVue);

Vue.use(VueRouter);

const routes = [
  { path: '', redirect: '/page/index.md/' },
  { path: '/', redirect: '/page/index.md/' },
  { path: '/create/', component: Create },
  { path: '/edit/:filename(\\w+\\.md)/', component: Edit, props: true },
  //  { path: '/delete/:filename(\\w+\\.md)/', component: Delete, props: true },
  //  { path: '/history/:filename(\\w+\\.md)/', component: History, props: true },
  { path: '/page/:filename(\\w+\\.md)/:anchor?', component: Page, props: true },
];

const scrollBehavior = to => ({ selector: `#${to.params.anchor}` });

const router = new VueRouter({ routes, scrollBehavior });

const app = new Vue({
  router,
  render(createElement) {
    return createElement(App);
  },
});

app.$mount('#app');
