<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  created(){ //取得遠端資料
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`; //路徑可能會更改所以這樣寫不太好 >> 去config dev
    //API伺服器路徑
    //所申請的APIPath
    console.log(process.env.APIPATH,process.env.CUSTOMPATH);
    this.$http.get(api).then((response) => {
    console.log(response.data)
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
