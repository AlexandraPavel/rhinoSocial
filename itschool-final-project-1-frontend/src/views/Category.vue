<template>
  <div class="home">
    <main class="page blog-post-list">
      <section class="clean-block clean-blog-list dark">
        <div class="container">
          <div v-if="this.$store.state.categories[this.id] != undefined">
            <div id="categoryDetails">
              <h1>{{ this.$store.state.categories[this.id].title }}</h1>
              <br />
              <p>{{ this.$store.state.categories[this.id].description }}</p>
              <br />
              <p>{{ this.$store.state.categories[this.id].rules }}</p>
            </div>
            <div class="text-center block-content">
              <div class="clean-blog-post">
                <div class="posts">
                  <CategoryPost
                    v-for="(post, index) in this.postsListLocal"
                    :key="index"
                    :postare="post"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
div {
  position: relative;
  margin-left: 25px;
  /* font-size: larger; */
  text-align: center;
  /* width: 90vw; */
}
#postare {
  background-color: red;
}
#categoryDetails {
  background-color: #5e3023;
  color: #f3e9dc;
}
</style>

<script>
import CategoryPost from "@/components/CategoryPost.vue";
export default {
  data() {
    return {
      id: 0,
      postsListLocal: [],
    };
  },
  components: {
    CategoryPost,
  },
  created() {
    this.$store.dispatch("fetchCategories").then((res) => {
      this.$store.dispatch("fetchPosts");
      if (sessionStorage.length != 0) this.id = sessionStorage.getItem("id");
      else {
        this.id = this.$route.params.id;
      }
      if (this.$store.state.categories[this.id] != undefined)
        this.postsListLocal = this.postbyId(
          this.$store.state.categories[this.id].postsList
        );
      return res;
    });
  },
  watch: {
    $route() {
      this.updatePage(this.$route.params.id);
    },
  },
  methods: {
    updatePage(param) {
      if (sessionStorage.length != 0) sessionStorage.removeItem("id");

      this.id = param;
      if (this.$store.state.categories[this.id] != undefined)
        this.postsListLocal = this.postbyId(
          this.$store.state.categories[this.id].postsList
        );
      sessionStorage.setItem("id", param);
    },
    postbyId(postId) {
      let newArr = [];
      if (postId)
        for (let i = 0; i < postId.length; i += 1) {
          for (let j = 0; j < this.$store.state.posts.length; j += 1)
            if (postId[i] == this.$store.state.posts[j]._id) {
              newArr.push(this.$store.state.posts[j]);
              break;
            }
        }
      return newArr;
    },
  },
};
</script>
