<template>
  <v-layout row wrap>
    <v-flex xs12 sm4>
        <v-card>
          <v-toolbar color="orange" dark>
          <v-toolbar-title>Your Recipes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark flat to="/dashboard/post/">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <template v-for="recipe in recipes">
            <v-list-tile :key="recipe._id" :to="{ name: 'selectPost', params:{ id: recipe._id } }">
              <v-list-tile-content>
                <v-list-tile-title class="text--white">{{ recipe.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-if="recipes.length <= 0">
            <v-list-tile-content>
              <v-list-tile-sub-title class="font-italic">No recipes yet.</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-card>
    </v-flex>
    <v-flex xs12 sm8>
      <router-view @recipeChanged="fetchRecipes"></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
import { $http } from "@/http-common";
import DashboardRecipe from "@/components/DashboardRecipe";

export default {
  name: "Dashboard",
  components: {
    DashboardRecipe
  },
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    fetchRecipes() {
      $http
        .get("/recipes/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.recipes = res.data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  },
  created() {
    this.fetchRecipes();
  }
};
</script>

<style>
</style>
