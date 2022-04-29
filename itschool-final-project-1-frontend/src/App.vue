<template>
  <nav
    class="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar"
  >
    <div class="container">
      <a class="navbar-brand logo" href="#">Rinocerii portocalii</a
      ><button
        data-bs-toggle="collapse"
        class="navbar-toggler"
        data-bs-target="#navcol-1"
      >
        <span class="visually-hidden">Toggle navigation</span
        ><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
            <!-- <router-link to="/categories">Categories</router-link> | -->
          </li>
          <li class="nav-item">
            <router-link to="/favourites">Favourites</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/createPostPage">Create Post</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings">Settings</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <div
      class="divId"
      v-if="$route.path === '/' || $route.path === '/category'"
    >
      <div>
        <CategoriesList />
      </div>
      <router-view />
    </div>
    <div v-else>
      <router-view />
    </div>

    <!-- <div>
        <router-view/>
      </div> -->
  </div>
  <footer class="page-footer dark">
    <!-- <div class="footer-copyright">
      <p>© Echipa Rinoceri:</p>
      <li>Hanga Mihail</li>
      <li>Pavel Alexandra</li>
      <li>Micu Rares</li>
      <li>Udriste Mihai</li>
      <li>Udrea Alexandru</li>
      <li>Liță Mihai Alexandru</li>
    </div> -->
    <div class="footer-copyright">
      <p>
        <br />© Echipa Rinoceri:<br /><br />Hanga Mihail <br />Pavel
        Alexandra<br />Micu Rares<br />Udriste Mihai<br />
        Udrea Alexandru <br />
        Liță Mihai Alexandru <br />
      </p>
    </div>
  </footer>
</template>

<script>
import CategoriesList from "./components/CategoriesList.vue";
export default {
  components: { CategoriesList },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.divId {
  display: flex;
  flex-direction: row;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.footer-copyright {
  background-color: #fff;
  padding-top: 3px;
  padding-bottom: 3px;
  text-align: center;
  margin-top: 50px;
  border: 1px solid #ededed;
}

.card-inner {
  margin-left: 4rem;
}
h1,
h2,
h3 {
  font-family: "Playfair Display", serif;
  color: #000;
}
.vanilla-zoom {
  width: 100%;
}
.vanilla-zoom .sidebar {
  width: 100%;
  display: flex;
}
.vanilla-zoom .sidebar img.small-preview {
  width: 60px;
  margin-right: 5px;
  cursor: pointer;
  opacity: 0.5;
}
.vanilla-zoom .sidebar img.small-preview.active,
.vanilla-zoom .sidebar img.small-preview:hover {
  opacity: 1;
}
.vanilla-zoom .sidebar img.small-preview:last-child {
  margin-right: 0;
}
.vanilla-zoom .zoomed-image {
  width: 100%;
  height: 300px;
  flex: 1;
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  margin-bottom: 5px;
}
</style>

<style src="./assets/bootstrap/css/bootstrap.min.css"></style>
