<template>
  <div class="createcateogry"> 
    <CreateCategory/>
  </div>
  
</template>

<script>
import CreateCategory from '../components/CreateCategory.vue'


export default {
  name:'CreateCategoryView',
  components: {
      CreateCategory
  },
  data() {
    return {
       createCategory: []
    }  
  }
}
</script>