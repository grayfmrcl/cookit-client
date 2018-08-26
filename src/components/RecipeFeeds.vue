<template>
  <div class="recipe__feeds">
     <div
      class="recipe__item"
      v-for="recipe in recipes"
      :key="recipe._id"
      @click="goToPost(recipe._id)"
      >
      <img src="" alt="Recipe Image">
      <h5>Recipe Title</h5>
      <p>Recipe Detail</p>
      <p>Author</p>
  </div>
  </div>
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
    goToPost(post_id) {
      this.$router.push("/recipes/" + post_id);
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
