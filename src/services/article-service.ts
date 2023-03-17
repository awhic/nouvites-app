import axios, { AxiosResponse } from 'axios';
import { Article } from '../interfaces/article';

export default class ArticleService {
  private static apiUrl = 'http://localhost:8080/v1/articles';

  static async getArticles(): Promise<Article[]> {
    try {
      const response: AxiosResponse = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
