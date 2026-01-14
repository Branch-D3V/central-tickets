import VideoById from "@/components/Videos/VideoById/component";
import { Stack } from "@chakra-ui/react";

interface PageProps {
  params: Promise<{
    uuid: string;
  }>;
}

export default async function VideoByIdPage({ params }: PageProps) {
  const { uuid } = await params;

  return (
    <Stack
      h="full"
      w="full"
      justify="flex-start"
      align="flex-start"
      px={2}
      pt="90px"
    >
      <VideoById uuid={uuid} />
    </Stack>
  );
}
