export type NotificationType =
  | "administrative"
  | "financial"
  | "maintenance"
  | "update";

export interface Notification {
  id: number;
  tenant_id?: number | null;
  user_id?: number | null;
  type: NotificationType;
  title: string;
  body: string;
  read_at?: string | null;
  created_at: string;
}

export interface CreateNotificationPayload {
  tenant_id?: number | null;
  user_id?: number | null;
  type: NotificationType;
  title: string;
  body: string;
}
