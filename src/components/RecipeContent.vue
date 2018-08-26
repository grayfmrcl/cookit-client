<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-media :src="recipe.img_url" height="300px" />
        <v-card-title primary-title>
            <h3 class="headline">{{recipe.title}}</h3>
        </v-card-title>
        <v-card-text>
          <div class="subheading text-left-xs">{{recipe.description}}</div>
          <div class="caption">by <span class="font-weight-bold">{{recipe.user.name}}</span></div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-title primary-title>
            <h3 class="title">Ingredients</h3>
        </v-card-title>
        <v-list>
          <template v-for="(ingredient, index) in recipe.ingredients">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title v-html="ingredientToString(ingredient)"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-card-title primary-title>
            <h3 class="title">Directons</h3>
        </v-card-title>
        <v-list>
          <template v-for="(direction, index) in recipe.directions">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title v-html="direction"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
        <v-divider></v-divider>
        <v-card-text>
          Notes:
          <p>{{recipe.notes}}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { $http } from "@/http-common.js";
export default {
  name: "RecipeContent",
  data() {
    return {
      recipe: {}
    };
  },
  computed: {
    ingredientToString() {
      return function(ingredient) {
        return `${ingredient.amount || ""} 
        ${ingredient.unit ? `${ingredient.unit} of` : ""}
        ${ingredient.name}`;
      };
    }
  },
  created() {
    $http
      .get("/recipes/" + this.$route.params.id)
      .then(res => {
        this.recipe = res.data;
      })
      .catch(err => console.log(err.response.data));
  }
};
</script>

<style>
</style>
