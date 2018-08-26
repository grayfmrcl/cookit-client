<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Cook IT</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> | 
      <router-link to="/auth">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    };
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
