<template>
  <v-layout row wrap>
    <v-flex
      v-for="recipe in recipes"
      :key="recipe._id"
      justify-start
      md4 sm6 xs12
      @click="goToRecipe(recipe._id)"
    >
      <v-card hover>
        <v-card-media :src="recipe.img_url" height="225px" />
        <v-card-title primary-title>
            <h3 class="headline">{{recipe.title}}</h3>
        </v-card-title>
        <v-card-text>
          <div class="subheading text-left-xs">{{recipe.description}}</div>
          <div class="caption">by <span class="font-weight-bold">{{recipe.user.name}}</span></div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { $http } from "@/http-common";
export default {
  name: "RecipeFeeds",
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
    },
    goToRecipe(recipe_id) {
      this.$router.push("/" + recipe_id);
    }
  },
  created() {
    this.fetchRecipes();
  }
};
</script>

<style>
.recipe__item {
  border: 1px solid #ccc;
}
</style>
