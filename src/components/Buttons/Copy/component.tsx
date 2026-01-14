"use client";

import { LuCopy, LuCopyCheck } from "react-icons/lu";
import React from "react";
import { ButtonCopyProps } from "./interface";
import { useLoading } from "@/hooks/useLoading/hook";
import ButtonAction from "../Action";

export function ButtonCopy({
  textCopy,
  color,
  variant,
  disabled,
  size = "sm",
  children,
  ...rest
}: ButtonCopyProps) {
  const { isLoading, executeWithLoading } = useLoading();

  const copyToClipboard = React.useCallback(
    (text: string) => {
      executeWithLoading(async () => {
        return new Promise((resolve) => {
          navigator.clipboard.writeText(text);

          setTimeout(() => {
            return resolve(undefined as never);
          }, 1000);
        });
      });
    },
    [executeWithLoading]
  );

  return (
    <ButtonAction
      size={size}
      variant={variant}
      disabled={disabled}
      color={color}
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      rightIcon={
        isLoading ? (
          <LuCopyCheck data-testid="copy-check-icon" size="15px" />
        ) : (
          <LuCopy data-testid="copy-icon" size="15px" />
        )
      }
      onClick={() => copyToClipboard(textCopy)}
      {...rest}
    >
      {isLoading ? "Copiado" : children}
    </ButtonAction>
  );
}
