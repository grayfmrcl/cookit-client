<template>
  <div>
    <h3>Register</h3>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
      </div>
      <button type="button" @click="register">Register</button>
    </form>
  </div>
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
          this.$router.push("/auth/login");
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
