import { LinkComponent } from "@/components/Link";
import { Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack w={"full"} h={"full"} align={"center"} justify={"start"} pt={"80px"}>
      <LinkComponent label="Dash" href={"/dashboard"} />
    </Stack>
  );
}
