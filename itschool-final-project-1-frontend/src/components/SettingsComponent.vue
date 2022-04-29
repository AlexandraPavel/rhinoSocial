<template>
  <main class="page blog-post-list" style="margin-top:83px">
    <div class="container">
      <div class="Settings">
        <div class="Looks">
          <h3>Look Card-uri</h3>
          <p>Activ is: {{ $store.state.homeFeedLook }}</p>
          <button
            v-if="this.modelLook.length != 0"
            class="btn btn-outline-dark btn-sm"
            type="button"
            @click="changeLook"
          >
            {{ this.modelLook }}
          </button>
        </div>
        <div class="Categories">
          <h3>Categorii</h3>
          <p
            v-for="category in $store.state.categoriesShown"
            :key="category._id"
          >
            {{ category.title }}<br />
            <button
              class="btn btn-outline-primary btn-sm"
              type="button"
              v-bind:value="category"
              @click="showCategory(category)"
            >
              {{ category.visible }}
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              type="button"
              v-bind:value="category"
              @click="deleteCategoryAndPosts(category, $store.state.posts)"
            >
              Sterge Categoria
            </button>
          </p>
          <br /><br />
          <button
            class="btn btn-outline-warning btn-sm"
            type="button"
            @click="goToCreateCategory"
          >
            Adauga Categorie
          </button>
          <br /><br /><br /><br />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      postIdToBeDeleted: "",
      categoryToBeDeleted: "",
      modelLook: "",
    };
  },
  methods: {
    showCategory(category) {
      if (category["visible"] == "Categorie Vizibila") {
        for (var postToBeShowed in category["posts"]) {
          const id = category["posts"][postToBeShowed];
          const res = store.state.showedPosts.filter((x) => x._id === id);

          if (res.length > 0) {
            this.removePostFromShowedPosts(res[0]);
          }
        }
        category["posts"] = [];
        category["visible"] = "Categorie Ascunsa";
      } else if (category["visible"] == "Categorie Ascunsa") {
        const cate = store.state.categories.filter(
          (x) => x != undefined && x._id === category["id"]
        );
        for (var postToBeShowed in cate[0].postsList) {
          const id = cate[0].postsList[postToBeShowed];
          const res = store.state.showedPosts.filter((x) => x._id === id);
          if (res.length === 0) {
            console.log(res);
            this.addPostToShowedPosts(id);
          }
        }
        category["posts"] = cate[0].postsList;
        category["visible"] = "Categorie Vizibila";
      }
    },
    changeLook() {
      // console.log("Html look", event.target.innerHTML)
      if (event.target.innerHTML == "Look Default") {
        this.modelLook = "Look Compact";
        store.state.homeFeedLook = "Look Default";
      } else if (event.target.innerHTML == "Look Compact") {
        this.modelLook = "Look Default";
        store.state.homeFeedLook = "Look Compact";
      }
    },
    deletePost: function () {
      fetch(`http://localhost:2234/posts/${this.postIdToBeDeleted}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("response:", res);
          return res.json();
        })
        .catch((err) => console.error(err));
    },
    deleteCategory: function () {
      fetch(`http://localhost:2234/categories/${this.categoryToBeDeleted}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("response:", res);
          return res.json();
        })
        .catch((err) => console.error(err));
    },
    deleteCategoryAndPosts: function (category, posts) {
      for (var i in category.postsList)
        for (var j in posts)
          if (posts[j]._id == category.postsList[i]) {
            this.postIdToBeDeleted = posts[j]._id;
            this.deletePost();
          }
      this.categoryToBeDeleted = category["id"];
      this.deleteCategory();
      store.state.categoriesShown = store.state.categoriesShown.filter(
        (x) => x["id"] != category["id"]
      );
      this.$router.go(0); //refresh la pagina pentru a reincarca categoriile
    },
    goToCreateCategory: function () {
      this.$router.push("/createCategory");
    },
    ...mapMutations(["addPostToShowedPosts", "removePostFromShowedPosts"]),
    ...mapActions(["fetchPosts", "fetchCategories", "fetchPostsSpecial"]),
  },

  created() {
    document.title = "Rinocerii Portocalii - Settings";
    this.fetchPosts();
    const ids = this.fetchCategories().then((res) =>
      res.filter((x) => x["posts"].length != 0).map((x) => x["posts"])
    );

    Promise.all([ids]).then((res) => {
      this.somePosts = [].concat.apply([], res[0]);
      this.fetchPostsSpecial(this.somePosts);
      return res;
    });
    this.modelLook =
      store.state.homeFeedLook.localeCompare("Look Default") == 0
        ? "Look Compact"
        : "Look Default";
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
