<template>
  <div class="create-recipe">
    <h2>Create a Recipe</h2>
    <form @submit.prevent>
      <div>
        <label for="title">Title</label>
        <input id="title" type="text" v-model="title">
      </div>
      <div>
        <label for="content">Content</label>
        <input id="content" type="text" v-model="content">
      </div>
      <button @click="addRecipe">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateRecipe",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    addRecipe() {
      console.log({
        title: this.title,
        content: this.content
      });
      alert("success");
      this.$router.push("/dashboard/recipe/5b7e31f4a422a688e9c69ecb");
    }
  }
};
</script>

