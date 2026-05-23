export type TicketStatus =
  | "open"
  | "in_progress"
  | "waiting_operator"
  | "closed";

export type TicketPriority = "high" | "medium" | "low";

export type TicketType =
  | "technical"
  | "financial"
  | "operational"
  | "improvement";

export interface TicketTag {
  id: number;
  name: string;
  color?: string;
}

export interface TicketUserRef {
  id: number;
  nome: string;
  role?: string;
}

export interface Attachment {
  id: number;
  ticket_id: number;
  message_id: number | null;
  uploader_id: number;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  is_image: boolean;
  download_url: string;
  created_at: string;
}

export interface TicketMessage {
  id: number;
  ticket_id?: number;
  user_id?: number;
  body: string;
  internal?: boolean;
  created_at: string;
  author?: TicketUserRef;
  attachments?: Attachment[];
}

export interface TicketActivityProperties {
  message_id?: number | null;
  attachments_count?: number;
  [key: string]: unknown;
}

export interface TicketActivity {
  id: number;
  ticket_id?: number;
  action: string;
  properties?: TicketActivityProperties | null;
  created_at: string;
  causer?: TicketUserRef | null;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  type: TicketType;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at?: string;
  due_at?: string | null;
  closed_at?: string | null;
  user?: TicketUserRef | null;
  assignee?: TicketUserRef | null;
  tags?: TicketTag[];
  messages?: TicketMessage[];
  activities?: TicketActivity[];
  attachments?: Attachment[];
  messages_count?: number | null;
}

export interface CreateTicketPayload {
  title: string;
  description: string;
  type: TicketType;
  priority: TicketPriority;
  tag_ids?: number[];
  due_at?: string | null;
}

export interface UpdateTicketPayload {
  status?: TicketStatus;
  priority?: TicketPriority;
  assignee_id?: number | null;
  justification?: string;
}

export interface SendTicketMessagePayload {
  body: string;
  internal?: boolean;
}
