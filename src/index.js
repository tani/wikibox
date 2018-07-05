import Vue from 'vue/dist/vue.runtime.esm.js';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue'
import Page from './Page.vue'
import './index.scss';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
    { path: '/:file/*', component: Page },
    { path: '/:file', redirect: '/:file/' },
    { path: '/', redirect: '/index.md/' }
];

const scrollBehavior = (to) => {
    return { selector: `#${to.path.replace(/^\/.*?\//, '')}` }
};

const router = new VueRouter({ routes, scrollBehavior });
const app = new Vue({
    router,
    el: '#app',
    render(createElement) {
        return createElement(App);
    }
})
