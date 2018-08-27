<template>
  <v-card>
    <v-toolbar color="orange" dark>
    <v-toolbar-title>Comments</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-list>
    <template v-for="comment in comments">
      <v-list-tile :key="comment.id">
            <v-list-tile-content>
              <v-list-tile-title v-html="comment.user.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="comment.message"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider :key="comment.id"></v-divider>
        </template>
        <v-list-tile v-if="comments.length <= 0">
        <v-list-tile-content>
          <v-list-tile-sub-title class="font-italic">No comments yet.</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      </v-list>
  <v-card-actions v-if="isLogin">
    <v-text-field label="Comment" v-model="new_message"></v-text-field>
    <v-btn color="orange" flat @click="postComment">
      <v-icon>send</v-icon>
    </v-btn>
  </v-card-actions>
  </v-card>
</template>

<script>
import { $http } from "@/http-common";

export default {
  name: "CommentSection",
  data() {
    return {
      comments: [],
      new_message: ""
    };
  },
  methods: {
    fetchComments() {
      $http
        .get("/comments/" + this.recipe_id)
        .then(res => {
          this.comments = res.data;
        })
        .catch(err => console.log(err));
    },
    postComment() {
      $http
        .post(
          "/comments/" + this.recipe_id,
          { message: this.new_message },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`
            }
          }
        )
        .then(res => {
          this.fetchComments();
          this.new_message = "";
        })
        .catch(err => console.log(err));
    },
    deleteComment(comment_id) {
      $http
        .delete(`/comments/${this.recipe_id}/${comment_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`
          }
        })
        .then(res => {
          this.fetchComments();
        })
        .catch(err => console.log(err));
    }
  },
  computed: {
    recipe_id() {
      return this.$route.params.id;
    },
    isLogin() {
      return localStorage.getItem("auth_token") ? true : false;
    }
  },
  created() {
    this.fetchComments();
  }
};
</script>

<style>
</style>
