<template>
  <v-app id="app">
    <v-toolbar app dark color="deep-orange">
      <v-toolbar-items>
        <v-btn to="/" flat>
          <span class="title">Cook IT</span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="isLogin" to="/dashboard" flat>
          Dashboard
        </v-btn>

        <v-divider vertical></v-divider>

        <v-btn v-if="isLogin" @click="logout" flat>
          Logout
        </v-btn>
        <v-btn v-if="!isLogin" to="/login" flat @login-success="setAuthToken">
          Login
        </v-btn>
        <v-divider v-if="!isLogin" vertical></v-divider>
        <v-btn v-if="!isLogin" to="/register" flat>
          Register
        </v-btn>
        
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container class="recipe-container" fluid grid-list-lg>
        <router-view @loginSuccess="setAuthToken" />
      </v-container>
    </v-content>
  </v-app>
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
    setAuthToken(payload) {
      localStorage.setItem("auth_token", payload.auth_token);
      this.isLogin = true;
      this.$router.push("/");
    },
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
#app .recipe-container {
  max-width: 960px;
}
</style>
