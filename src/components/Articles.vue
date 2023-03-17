<template>
  <button class="btn" @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleService from '../services/article-service';

export default defineComponent({
  name: 'VueButton',
  data() {
    return {
      isHovered: false,
      buttonText: 'Load Articles'
    };
  },
  methods: {
    async handleClick() {
      const articles = await ArticleService.getArticles();

      console.log(articles);
    }
  }
});
</script>

<style scoped>
.btn {
  background-color: #41b883;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.2s ease-in-out;
}

.btn:hover {
  background-color: #52c794;
}
</style>
