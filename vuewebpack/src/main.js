// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";

import App from './App';
import router from './router'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  // ...
  console.log('to',to,'from',from,'next',next);
  if (to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`; //路徑可能會更改所以這樣寫不太好 >> 去config dev
    axios.post(api).then((response) => { //this.$http是Vue的元件內才可以使用 >> 把它拿掉直接替換成axios
    console.log(response.data);
    if (response.data.success){
      next();
    }else{
      next({
        path: '/login', //我們要到的路徑
      })
    }
    })
  }else{
    next(); //直接放行
  }
  
})
