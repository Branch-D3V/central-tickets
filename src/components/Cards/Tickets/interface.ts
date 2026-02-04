import { Ticket } from "@/interfaces/Ticket";
import { StackProps } from "@chakra-ui/react";

export interface CardTicketProps extends StackProps {
  ticket: Ticket;
}
