import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard02 from '@/components/Dashboard02';
import Products from '@/components/pages/Products';


Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '*',
            redirect: '/login', //避免用戶去不存在的頁面
        },
        // {
        //     name: '首頁',
        //     path: '/',
        //     component: Home,
        // },
        {
            name: 'Login',
            path: '/login',
            component: Login,
        },
        {
            name: 'HelloWorld',
            path: '/admin',
            component: Dashboard02,
            children: [
                {
                    name: 'Products',
                    path: 'products',
                    component: Products,
                    meta: { requiresAuth: true } //確保進入頁面前有經過驗證
                },
            ]
        },
    ]
});