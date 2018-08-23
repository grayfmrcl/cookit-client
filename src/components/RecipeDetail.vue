<template>
  <div class="recipe-detail">
    <h2>Recipe Detail</h2>
    <h3>{{recipe.title}}</h3>
    <p>{{recipe.content}}</p>
    <ul>
      <li v-for="(tag, index) in recipe.tags" :key="index">{{tag}}</li>
    </ul>
  </div>
</template>

<script>
import { $http } from "@/http-common";

export default {
  name: "RecipeDetail",
  data() {
    return {
      recipe: {}
    };
  },
  methods: {
    fetchRecipe() {
      $http
        .get("/recipes/" + this.$route.params.id)
        .then(res => {
          console.log(this.$route.params.id);
          this.recipe = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.fetchRecipe();
  },
  watch: {
    $route() {
      this.fetchRecipe();
    }
  }
};
</script>