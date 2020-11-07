<template>
  <div>
   <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" v-model="user.username" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="user.password" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>   
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
          username: '',
          password: ''
      }
    }
  },
  methods: {
      signin(){
        const api = `${process.env.APIPATH}/admin/signin`; 
        const vm = this;
        this.$http.post(api, vm.user).then((response) => { //post>>把用戶的資料傳進來
        console.log(response.data);
        if (response.data.success){
          const token = response.data.token; //寫入cookie前先把值取出來(token 和 expired的值) (登入後打開Network 會有token 和 expired這兩個值)
          const expired = response.data.expired;
          console.log(token, expired);//把這兩個值寫到cookie裡面
          document.cookie = `someCookieName=${token}; expires=${new Date(expired)};`; //存取、寫入cookie
            vm.$router.push('/admin/products');
        }
      });
    }
    }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

