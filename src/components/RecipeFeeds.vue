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
        <v-flex xs12 flexbox justify-center>
          <div class="headline font-weight-bold">{{recipe.title}}</div>
          <div class="subheading font-weight-thin font-italic">{{recipe.description}}</div>
          <div class="caption">by <span class="font-weight-bold">{{recipe.user.name}}</span></div>
        </v-flex>
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
