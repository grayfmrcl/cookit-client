<template>
  <v-card>
    <v-card-media :src="recipe.img_url" height="300px">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 justify-end flexbox dark>
            <v-btn v-if="!updateMode" color="orange" icon dark large @click="updateMode=true" >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn v-if="!updateMode" color="orange" icon dark large @click="deleteConfirm=true">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
    <v-layout row wrap>
      <v-flex xs12>
      <v-card-title primary-title>
        <v-flex xs12 flexbox justify-center>
          <v-text-field v-if="updateMode" label="Title" v-model="recipe.title"></v-text-field>
          <h5 v-else class="headline font-weight-bold">{{recipe.title}}</h5>
        </v-flex>
        <v-flex xs12 justify-center>
          <v-textarea v-if="updateMode" label="Description" v-model="recipe.description"></v-textarea>
          <span v-else class="subheading font-weight-thin font-italic">{{recipe.description}}</span>
        </v-flex>
        <v-flex xs12 v-if="updateMode">
          <v-text-field v-if="updateMode" label="Image URL" v-model="recipe.img_url"></v-text-field>
        </v-flex>
    </v-card-title>
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
            <v-list-tile-title>{{index+1}}. {{ingredient}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="updateMode">
            <v-btn color="orange" dark icon @click="deleteIngredient(index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-list-tile>
        <v-flex xs10 v-if="updateMode">
          <v-text-field label="Add ingredient" v-model="new_ingredient"></v-text-field>
        </v-flex>
        <v-flex xs2 v-if="updateMode">
          <v-btn color="orange" flat @click="addIngredient">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-card-title primary-title>
      <div class="title">Directions</div>
      <v-spacer></v-spacer>
      <v-text-field v-if="updateMode" type="number" prepend-icon="access_time" suffix="minutes" v-model="recipe.estimated_time"></v-text-field>
      <span v-else class="title grey--text">
        <v-icon>access_time</v-icon>
        {{recipe.estimated_time}} minutes
      </span>
    </v-card-title>
    <v-list>
      <template v-for="(direction, index) in recipe.directions">
        <v-list-tile :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{index+1}}. {{direction}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="updateMode">
            <v-btn color="orange" dark icon @click="deleteDirection(index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </template>
       <v-list-tile>
        <v-flex xs10 v-if="updateMode">
          <v-text-field label="Add direction" v-model="new_direction"></v-text-field>
        </v-flex>
        <v-flex xs2 v-if="updateMode">
          <v-btn color="orange" flat @click="addDirection">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-list-tile>
    </v-list>
    <v-divider v-if="updateMode"></v-divider>
    <v-card-actions v-if="updateMode">
      <v-spacer></v-spacer>
      <v-btn xs12 md6 color="grey lighten-1" dark large @click="cancelUpdate">Cancel</v-btn>
      <v-btn xs12 md6 color="orange" dark large @click="saveUpdate">Save</v-btn>
    </v-card-actions>

    <v-dialog
      v-model="deleteConfirm"
      max-width="290"
    >
      <v-card>
        <v-card-title class="title">Delete?</v-card-title>
        <v-card-text class="subheading">{{recipe.title}}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="orange" flat @click="deleteConfirm = false">
            No
          </v-btn>
          <v-btn color="orange" flat="flat" @click="deleteRecipe">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { $http } from "@/http-common";

export default {
  name: "DashboardRecipe",
  data() {
    return {
      recipe: {
        ingredients: [],
        directions: []
      },
      new_ingredient: "",
      new_direction: "",
      updateMode: false,
      deleteConfirm: false
    };
  },
  methods: {
    fetchRecipe() {
      $http
        .get("/recipes/" + this.$route.params.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.recipe = res.data;
        })
        .catch(err => console.log(err.response.data));
    },
    addIngredient() {
      this.recipe.ingredients.push(this.new_ingredient);
      this.new_ingredient = "";
    },
    addDirection() {
      this.recipe.directions.push(this.new_direction);
      this.new_direction = "";
    },
    deleteIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    deleteDirection(index) {
      this.recipe.directions.splice(index, 1);
    },
    cancelUpdate() {
      this.updateMode = false;
      this.fetchRecipe();
    },
    saveUpdate() {
      if (!this.recipe._id) {
        this.addRecipe();
      } else {
        this.updateRecipe();
      }
    },
    addRecipe() {
      $http
        .post("/recipes/", this.recipe, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.updateMode = false;
          this.$emit("recipeChanged");
          this.$router.push(res.data.data._id);
        })
        .catch(err => console.log(err.response.data.error));
    },
    updateRecipe() {
      $http
        .put("/recipes/" + this.recipe._id, this.recipe, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.updateMode = false;
          this.$emit("recipeChanged");
          this.fetchRecipe();
        })
        .catch(err => console.log(err.response.data.error));
    },
    deleteRecipe() {
      $http
        .delete("/recipes/" + this.recipe._id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.updateMode = false;
          this.$emit("recipeChanged");
          this.$router.push("/dashboard");
        })
        .catch(err => console.log(err.response.data.error));
      this.deleteConfirm = false;
    }
  },
  created() {
    if (this.$route.params.id) {
      this.updateMode = false;
      this.fetchRecipe();
    } else {
      this.updateMode = true;
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.updateMode = false;
        this.fetchRecipe();
      } else {
        this.recipe = { ingredients: [], directions: [] };
        this.updateMode = true;
      }
    }
  }
};
</script>

<style>
</style>
