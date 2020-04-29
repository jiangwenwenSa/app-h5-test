import Vue from 'vue'
import Foo from './components/foo.vue'
import Main from './components/main.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import Cookies from 'vue-js-cookie'


Vue.use(VueRouter);
Vue.use(ElementUI)
Vue.use(Cookies)

const routes = [
  { path: '/', redirect: '/main',meta:{title:"首页入口"} },
  { path: '/main', component: Main ,meta:{title:"main入口"}},
  { path: '/foo', component: Foo ,meta:{title:"foo入口"}},
]

const router = new VueRouter({
  mode:"history",
  routes 
})

router.beforeEach((to,from,next)=>{
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  
})

// router.afterEach((to,from) => {
//   Vue.nextTick(() => {
//       sensors.quick("autoTrackSinglePage",{$title:to.meta.title});
//   });
// });



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
