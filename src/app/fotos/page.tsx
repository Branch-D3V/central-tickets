import PicturesComponent from "@/components/Pictures";
import { Stack, Text } from "@chakra-ui/react";

export default function PicturesPage() {
  return (
    <Stack
      h={"full"}
      w={"full"}
      justify={"flex-start"}
      align={"flex-start"}
      px={2}
      pt={"90px"}
    >
      <PicturesComponent />
    </Stack>
  );
}
