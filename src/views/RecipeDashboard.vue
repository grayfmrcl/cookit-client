<template>
  <div class="recipe-dashboard">
    <div class="recipe-sidebar">
      <h2>Recipe Sidebar</h2>
        <ul>
          <li v-for="recipe in recipes" :key="recipe._id">
            <router-link :to="`/recipe/${recipe._id}`">{{recipe.title}}</router-link>
          </li>
        </ul>
    </div> 
    <router-view/>
  </div>
</template>

<script>
import RecipeDetail from "@/components/RecipeDetail";
import { $http } from "@/http-common";

export default {
  name: "RecipeDashboard",
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    fetchRecipes() {
      $http("/recipes")
        .then(res => {
          this.recipes = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.fetchRecipes();
  }
};
</script>

