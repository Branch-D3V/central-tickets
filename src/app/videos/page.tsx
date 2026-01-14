import VideosComponent from "@/components/Videos";
import { Stack } from "@chakra-ui/react";

export default function VideosPage() {
  return (
    <Stack
      h={"full"}
      w={"full"}
      justify={"flex-start"}
      align={"flex-start"}
      px={2}
      pt={"90px"}
    >
      <VideosComponent />
    </Stack>
  );
}
