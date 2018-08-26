<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 sm8 md6 lg4>
      <v-form>
        <v-text-field v-model="name" label="Name"></v-text-field>
        <v-text-field type="email" v-model="email" label="E-mail"></v-text-field>
        <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        <v-btn block dark color="orange darken-2" large @click="register">Register</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { $http } from "@/http-common.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessages: []
    };
  },
  methods: {
    register() {
      this.errorMessages = [];
      $http
        .post("/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
          this.$router.push("/login");
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
