import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useSelection } from "./selectionProvider";

type Props = {
  id: string;
  children: React.ReactNode;
};

export function SelectableItem({ id, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedIds, registerItem } = useSelection();

  useEffect(() => {
    if (ref.current) {
      registerItem(id, ref.current.getBoundingClientRect());
    }
  }, []);

  const isSelected = selectedIds.has(id);

  return (
    <Box
      ref={ref}
      border={isSelected ? "2px solid #FF0080" : "2px solid transparent"}
      bg={isSelected ? "rgba(255,0,128,0.1)" : "transparent"}
      borderRadius="8px"
      transition="all .2s"
      userSelect="none"
    >
      {children}
    </Box>
  );
}
