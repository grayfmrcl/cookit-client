<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="button" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import { $http } from "@/http-common.js";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      $http
        .post("/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.$emit("loginSuccess", { auth_token: res.data.auth_token });
          this.$router.push("/");
        })
        .catch(err => {
          alert(err.response.data.error);
        });
    }
  }
};
</script>

<style>
</style>
