<template>
  <v-layout row wrap>
    <v-flex xs4>
        <v-card>
          <v-toolbar color="orange" dark>
          <v-toolbar-title>Your Recipes</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark flat>
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <template v-for="recipe in recipes">
            <v-list-tile :key="recipe._id" :to="{ name: 'post', params:{ id: recipe._id } }">
              <v-list-tile-content>
                <v-list-tile-title class="text--white">{{ recipe.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="orange" dark icon>
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-btn color="orange" dark icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
          
        </v-card>
    </v-flex>
    <v-flex xs8>
      <router-view></router-view>
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
        .get("/recipes")
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
