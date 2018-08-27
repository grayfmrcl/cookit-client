<template>
  <v-layout row wrap>
    <v-flex xs8>
      <RecipeContent />
    </v-flex>
    <v-flex xs4>
      <CommentSection />
    </v-flex>
  </v-layout>
</template>

<script>
import RecipeContent from "@/components/RecipeContent";
import CommentSection from "@/components/CommentSection";
export default {
  name: "Post",
  components: {
    RecipeContent,
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
