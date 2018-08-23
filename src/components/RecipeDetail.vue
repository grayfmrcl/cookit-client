<template>
  <div class="recipe-detail">

    <div v-if="!editMode" class="recipe-info">
      <h2>Recipe Info</h2>
      <button @click="editMode=true">Edit</button>
      <button @click="deleteRecipe">Delete</button>
      <h3>{{recipe.title}}</h3>
      <p>{{recipe.content}}</p>
      <ul>
        <li v-for="(tag, index) in recipe.tags" :key="index">{{tag}}</li>
      </ul>
    </div>

    <div v-else class="edit-recipe">
      <h2>Edit Recipe</h2>
      <form @submit.prevent>
        <div>
          <label for="title">Title</label>
          <input id="title" type="text" v-model="recipe.title">
        </div>
        <div>
          <label for="content">Content</label>
          <input id="content" type="text" v-model="recipe.content">
        </div>
        <button @click="editMode=false">Cancel</button>
        <button @click="editRecipe">Update</button>
      </form>
    </div>

  </div>
</template>

<script>
import { $http } from "@/http-common";

export default {
  name: "RecipeDetail",
  data() {
    return {
      recipe: {},
      editMode: false
    };
  },
  methods: {
    fetchRecipe() {
      $http
        .get("/recipes/" + this.$route.params.id)
        .then(res => {
          this.recipe = res.data;
          this.editMode = false;
        })
        .catch(err => console.log(err));
    },
    editRecipe() {
      console.log("Edit: ", {
        _id: this.recipe._id,
        title: this.recipe.title,
        content: this.recipe.content
      });
      alert("success");
      this.$router.push(`/dashboard/recipe/${this.recipe._id}`);
      this.editMode = false;
    },
    deleteRecipe(to, from) {
      console.log("Deleted: ", {
        _id: this.recipe.id
      });
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