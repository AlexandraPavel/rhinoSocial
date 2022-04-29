<template>
  <div class="home">
    <main class="page blog-post-list">
      <section class="clean-block clean-blog-list dark">
        <div class="container">
          <div class="block-heading">
            <h2 class="text-info">Postari favorite</h2>
            <p>Aici poti vedea postarile favorite ale rinocerilor portocalii</p>
          </div>
          <div class="text-center block-content">
            <div class="clean-blog-post">
              <div class="posts">
                <label for="Sort">Sorteaza postarile: </label>
                <select
                  name="Sort"
                  class="form-select form-select-lg"
                  v-model="sortedModel"
                  @change="this.sortBy(sortedModel)"
                >
                  <option>Default</option>
                  <option>Category (A-Z)</option>
                  <option>Category (Z-A)</option>
                  <option>Date - Old to New</option>
                  <option>Date - New to Old</option>
                  <option>No. of UpVotes (asc)</option>
                  <option>No. of UpVotes (desc)</option>
                  <option>No. of DownVotes (asc)</option>
                  <option>No. of DownVotes (desc)</option>
                </select>
                <div v-for="(item, index) in favouritePosts" :key="index">
                  <HomePage v-bind:postare="item" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from "@/components/HomePage.vue";
import { mapMutations, mapActions } from "vuex";
import store from "../store";

export default {
  name: "HomeView",
  components: {
    HomePage,
  },
  data() {
    return {
      sortedModel: "",
    };
  },
  computed: {
    favouritePosts() {
      return this.$store.state.posts.filter((post) => post.favourite);
    },
  },
  methods: {
    sortPosts(type) {
      if (type === 0) {
        // Default
        store.state.posts = store.state.posts.sort((a, b) =>
          a.date < b.date ? 1 : -1
        );
      } else if (type === 1) {
        // Category (A-Z)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.title.localeCompare(b.title) > 0 ? 1 : -1
        );
      } else if (type === 2) {
        // Category (Z-A)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.title.localeCompare(b.title) < 0 ? 1 : -1
        );
      } else if (type === 3) {
        // Date - Old to New
        store.state.posts = store.state.posts.sort((a, b) =>
          a.date > b.date ? 1 : -1
        );
      } else if (type === 4) {
        // Date - New to Old
        store.state.posts = store.state.posts.sort((a, b) =>
          a.date < b.date ? 1 : -1
        );
      } else if (type === 5) {
        // No. of UpVotes (asc)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.upvote > b.upvote ? 1 : -1
        );
      } else if (type === 6) {
        // No. of UpVotes (desc)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.upvote < b.upvote ? 1 : -1
        );
      } else if (type === 7) {
        // No. of DownVotes (asc)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.downvote > b.downvote ? 1 : -1
        );
      } else if (type === 8) {
        // No. of DownVotes (desc)
        store.state.posts = store.state.posts.sort((a, b) =>
          a.downvote < b.downvote ? 1 : -1
        );
      }
    },
    sortBy(type) {
      // console.log(type);
      if (type === "Default") {
        store.state.sortingPostType = 0;
      } else if (type === "Category (A-Z)") {
        store.state.sortingPostType = 1;
      } else if (type === "Category (Z-A)") {
        store.state.sortingPostType = 2;
      } else if (type === "Date - Old to New") {
        store.state.sortingPostType = 3;
      } else if (type === "Date - New to Old") {
        store.state.sortingPostType = 4;
      } else if (type === "No. of UpVotes (asc)") {
        store.state.sortingPostType = 5;
      } else if (type === "No. of UpVotes (desc)") {
        store.state.sortingPostType = 6;
      } else if (type === "No. of DownVotes (asc)") {
        store.state.sortingPostType = 7;
      } else if (type === "No. of DownVotes (desc)") {
        store.state.sortingPostType = 8;
      }
      this.sortPosts(store.state.sortingPostType);
    },
    ...mapActions(["fetchPosts"]),
  },
  created() {
    this.fetchPosts();
    document.title = "Rinocerii Portocalii - Favourites"
  },
};
</script>
