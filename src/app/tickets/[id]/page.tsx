import TicketDetailComponent from "./_components/ticket-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <TicketDetailComponent id={id} />;
}
