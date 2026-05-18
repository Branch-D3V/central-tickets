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

export interface TicketMessage {
  id: number;
  ticket_id: number;
  user_id: number;
  body: string;
  internal?: boolean;
  created_at: string;
  author?: {
    id: number;
    nome: string;
    role: string;
  };
}

export interface TicketActivity {
  id: number;
  ticket_id: number;
  action: string;
  meta?: Record<string, unknown>;
  created_at: string;
  user?: {
    id: number;
    nome: string;
  };
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
  tag_ids?: number[];
  tags?: TicketTag[];
  messages?: TicketMessage[];
  activities?: TicketActivity[];
  assignee_id?: number | null;
  requester_id?: number;
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
