<template>
  <div class="home">
    <h1>Cook IT</h1>
    <RecipeFeeds />
  </div>
</template>

<script>
import RecipeFeeds from "@/components/RecipeFeeds.vue";
export default {
  name: "Home",
  components: {
    RecipeFeeds
  }
};
</script>

<style>
</style>
