<template>
  <div class="auth">
    <h2>Auth</h2>
    <router-link to="/auth/login">Login</router-link> | 
    <router-link to="/auth/register">Register</router-link>
    <router-view @loginSuccess="setAuthToken"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    setAuthToken(payload) {
      console.log("Auth >> login-success");
      localStorage.setItem("auth_token", payload.auth_token);
      this.$emit("login-success");
    }
  }
};
</script>

<style>
</style>
