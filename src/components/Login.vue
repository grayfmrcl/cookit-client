<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm8 md6 lg4>
      <v-form>
        <v-text-field type="email" v-model="email" label="E-mail"></v-text-field>
        <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        <v-btn block color="primary" large @click="login">Login</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
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
