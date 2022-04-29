<template>
  <div class="createPostPage"> 
    <CreatePostPage/>
  </div>
  
</template>

<script>
import CreatePostPage from '../components/CreatePostPage.vue'


export default {
  name:'CreatePost',
  components: {
      CreatePostPage
  },
  data() {
    return {
       createPostPage: []
    }  
  }
}
</script>