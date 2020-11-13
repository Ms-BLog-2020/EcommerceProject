// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import Loading from 'vue-loading-overlay'; //必須要被啟用
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate, { validate } from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import App from './App';
import router from './router';
import './router/bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Validate.Validator.localize('zh_TW',zhTWValidate)

Vue.component('Loading', Loading);//此啟用方式為全域 不用到個別元件啟用
Vue.filter('currency', currencyFilter); //自定義的名稱, import的名稱

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
