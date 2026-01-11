import VideosComponent from "@/components/VideosComponent";
import { Stack, Text } from "@chakra-ui/react";

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
      <Text fontSize="40px" zIndex={10}>
        Videos
      </Text>
      <VideosComponent />
    </Stack>
  );
}
