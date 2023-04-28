<template>
  <div>
    <div class="article-list">
      <div class="article-container" v-for="(article, index) in articles" :key="index">
        <div class="article">
          <img class="article-image" :src="article.urlToImage" />
          <div class="article-published">{{ article.publishedAt }}</div>
          <div class="article-title">{{ article.title }}</div>
          <div class="article-description">{{ article.description }}</div>
          <div class="article-author">{{ article.author }}</div>
          <a :href="article.url" target="_blank" rel="noopener noreferrer">Read</a>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button class="btn" @click="fetchArticles">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toDisplayString } from 'vue';
import { Article } from '../interfaces/article';
import ArticleService from '../services/article-service';
import store from '../store';
import { POSITION, useToast } from 'vue-toastification';

export default defineComponent({
  name: 'VueButton',
  data() {
    return {
      isHovered: false,
      buttonText: 'Reload Articles',
      articles: [] as Article[],
      toast: useToast()
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      if (store?.getters?.getApiKey) {
        this.articles = await ArticleService.getArticles();
        this.toast.success("Articles loaded!");
      } else {
        this.toast.warning("No API key provided! Please enter one in 'Settings'.");
      }
    }
  }
});
</script>

<style scoped>
.article-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.article-container {
  width: 300px;
  margin: 20px;
}

.article {
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
  height: 200px;
  object-fit: cover;
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
  background-color: #242424;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  margin-top: auto;
}

.button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
}

.button-container .btn {
  box-shadow: 0px 1px 0px 0px;
  margin-right: 2%;
}
</style>