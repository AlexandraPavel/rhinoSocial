<template>
  <div id = "main">
    <h2 id="CatText">Categories</h2>
    <div v-for="(category, index) in $store.state.categories"
      :key="index">
        <p
        id="CatText"
        @click="goTo(index)"
        >
        {{ categoryTest(category) }} 
        </p>
        <br/>
    </div>
  </div>
</template>
<style scoped>
#CatText {
  text-align: center;
}
#main {
  margin-top: 200px;
  position: relative;
  height: 100vh;
  min-width: 12%;
  max-height: 800px;
  border: solid;
}
p {
  display: table;
  cursor: pointer;
  color: rgb(80, 76, 106);
  text-decoration: underline;
  margin: auto;
  transition: 1s;
}
p:hover {
  color: navy;
}
</style>

<script>
export default {
  methods: {
    goTo(index) {
      this.$router.push({ name: "category", params: { id: index } });
    },
    categoryTest(category) {
      return category != undefined ? category.title : null;
    },
  },
  created() {
    this.$store.dispatch("fetchCategories");
    this.$store.dispatch("fetchPosts");
  },
};
</script>