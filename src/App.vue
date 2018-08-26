<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Cook IT</router-link> |
      <router-link v-if="isLogin" to="/dashboard">Dashboard</router-link> | 
      <router-link v-if="!isLogin" to="/auth/login">Login</router-link> | 
      <a v-if="isLogin" @click="logout" href="javascript:void(0)">Logout</a>
    </div>
    <router-view @login-success="isLogin=true" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("auth_token");
      this.isLogin = false;
      this.$router.push("/");
    }
  },
  created() {
    if (localStorage.getItem("auth_token")) {
      this.isLogin = true;
    }
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
