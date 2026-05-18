export interface Changelog {
  id: number;
  version: string;
  title: string;
  body: string;
  released_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface SaveChangelogPayload {
  version: string;
  title: string;
  body: string;
  released_at?: string;
}
