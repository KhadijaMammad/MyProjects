export interface News {
  news_id: number;
  user_id: number;
  title: string;
  summary: string | null;
  keywords: string;
  insight: string;
  news_url: string | null;
  category_id: number;
  sites_id: number | null;
  image_url: string | null;
  news_lang: string;
  news_date: string;
  sent_at: string | null;
  Category?: {
    category_name: string;
  };
}

export interface NewsResponse {
  status: number;
  message: string;
  data: News[];
}