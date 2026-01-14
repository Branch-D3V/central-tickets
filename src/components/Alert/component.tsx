"use client";

import { Alert } from "@chakra-ui/react";
import { AlertMessageProps } from "./interface";

export function AlertMessage({
  title,
  message,
  status = "info",
  colorIcon = "#FF0080",
  ...rest
}: AlertMessageProps) {
  return (
    <Alert.Root
      status={status}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius="md"
      gap={0}
      {...rest}
    >
      <Alert.Indicator boxSize="40px" color={colorIcon} mb={2} />

      <Alert.Content alignItems="center">
        {title && (
          <Alert.Title fontSize="lg" mt={2}>
            {title}
          </Alert.Title>
        )}

        {message && (
          <Alert.Description maxW="sm" mt={1}>
            {message}
          </Alert.Description>
        )}
      </Alert.Content>
    </Alert.Root>
  );
}
