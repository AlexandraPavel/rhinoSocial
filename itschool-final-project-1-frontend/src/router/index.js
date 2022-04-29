import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import SettingsView from '../views/SettingsView.vue'
import CreateCategoryView from '../views/CreateCategoryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/postpage',
    name: 'postpage',
    component: () => import(/* webpackChunkName: "postpage" */ '../views/PageView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/createCategory',
    name: 'createCategory',
    component: CreateCategoryView
  },
  {
    path: '/favourites',
    name: 'favourites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "postpage" */ '../views/FavouritesView.vue')
  },
  {
    path: '/createPostPage',
    name: 'createpostpage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreatePostPageView.vue')
  },
  {
    path: '/createcategory',
    name: 'createcategory',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/Category.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
