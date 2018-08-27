<template>
  
      <v-card>
        <v-card-media :src="recipe.img_url" height="300px" />
        <v-layout row wrap>
          <v-flex xs12 md6>
          <v-card-title primary-title>
            <div>
              <div class="headline font-weight-bold">{{recipe.title}}</div>
              <span class="subheading font-weight-thin font-italic">{{recipe.description}}</span>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs12 md6>
          <v-card-actions>
            <v-flex xs3>
              <v-btn dark color="orange">Facebook</v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn dark color="orange">Twitter</v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn dark color="orange">Pinterest</v-btn>
            </v-flex>
            <v-flex xs3>
              <v-btn dark color="orange">Google+</v-btn>
            </v-flex>
          </v-card-actions>
        </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-title primary-title>
            <div class="title">Ingredients</div>
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
          <div class="title">Directions</div>
          <v-spacer></v-spacer>
          <span class="title grey--text">
            <v-icon>access_time</v-icon>
            {{recipe.estimated_time}} minutes
          </span>
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
      </v-card>
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
  methods: {},
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
