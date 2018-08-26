<template>
  <div class="recipe__post">
    <p>{{this.$route.params.id}}</p>
    <div class="recipe__left">
      <h3>Recipe left</h3>
    </div>
    <div class="recipe__right">
      <h3>Recipe right</h3>
      <div>
        <h4>Recipe Content</h4>
      </div>
      <CommentSection />
    </div>
  </div>
</template>

<script>
import CommentSection from "@/components/CommentSection";
export default {
  name: "Post",
  components: {
    CommentSection
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
</style>
