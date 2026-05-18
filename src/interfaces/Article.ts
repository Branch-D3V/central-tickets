export interface Article {
  id: number;
  title: string;
  body: string;
  category?: string | null;
  slug?: string;
  created_at: string;
  updated_at?: string;
}

export interface SaveArticlePayload {
  title: string;
  body: string;
  category?: string | null;
}
