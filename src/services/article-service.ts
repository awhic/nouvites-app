import axios, { AxiosResponse } from 'axios';
import { Article } from '../interfaces/article';
import store from '../store';

export default class ArticleService {
  // private static apiUrl = 'http://localhost:8080/v1/articles/top-stories';
  // private static apiUrl = 'http://localhost:8080/v1/articles/test-data';

  static async getArticles(): Promise<Article[]> {
    const API_KEY = store.getters.getApiKey;
    const COUNTRY = store.getters.getSelectedCountryCode;

    const url = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;

    console.log(COUNTRY);
    try {
      const response = await axios.get(url);

      if (response.status !== 200) {
        console.error('Error fetching top headlines: unexpected response code; expecting 200.');
      }

      const articles: Article[] = response.data.articles.map((jsonArticle: any) => {
        const article: Article = {
          title: jsonArticle.title,
          description: jsonArticle.description,
          url: jsonArticle.url,
          source: jsonArticle.source.name,
          publishedAt: jsonArticle.publishedAt,
          urlToImage: jsonArticle.urlToImage,
          author: '',
          content: ''
        };
        return article;
      });

      return articles;
    } catch (error) {
      console.error('Error fetching top headlines: ', error);
      return [];
    }
  }
}
