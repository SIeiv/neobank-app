import type { News } from '@/entities/news/model/types';

export interface GetNewsTopHeadlinesRequest {
  apiKey: string;
  country?: string;
  category?: string;
  pageSize?: number;
  page?: number;
  sources?: string;
  q?: string;
}

export interface GetNewsTopHeadlinesResponse {
  status: string;
  totalResults: number;
  articles: News[];
}
