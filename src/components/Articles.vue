<template>
  <div class="article-list" v-if="articles">
    <div class="article" v-for="(article, index) in articles" :key="index">
      <img class="article-image" :src?="article.urlToImage"/>
      <div class="article-published">{{ article.publishedAt }}</div>
      <div class="article-title">{{ article.title }}</div>
      <div class="article-description">{{ article.description }}</div>
      <div class="article-author">{{ article.author }}</div>
      <a :href="article.url" target="_blank" rel="noopener noreferrer">Read</a>
    </div>
  </div>

  <button class="btn" @mouseover="isHovered = true" @mouseleave="isHovered = false" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Article } from '../interfaces/article';
import ArticleService from '../services/article-service';

export default defineComponent({
  name: 'VueButton',
  data() {
    return {
      isHovered: false,
      buttonText: 'Reload Articles',
      articles: [] as Article[]
    };
  },
  methods: {
    async handleClick() {
      this.articles = await ArticleService.getArticles();
      console.log(this.articles);
    }
  }
});
</script>

<style scoped>
.btn {
  margin-top: 20px;
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

.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.article {
  width: 300px;
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  background-color: #353535;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.article-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-description {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  margin-bottom: 8px;
}

.article-published {
  font-size: 0.8rem;
  color: #666666;
  margin-bottom: 10px;
}

.article-author {
  font-size: 0.8rem;
  font-style: italic;
  margin-bottom: 10px;
}

a {
  display: inline-block;
  padding: 5px 10px;
  background-color: #41b883;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  margin-top: auto;
}

</style>
