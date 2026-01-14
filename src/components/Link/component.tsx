"use client";

import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { LinkComponentProps } from "./interface";

export default function LinkComponent({
  href,
  label,
  ...rest
}: LinkComponentProps) {
  return (
    <Link
      as={NextLink}
      href={href}
      transition="0.3s"
      alignContent="center"
      textDecoration="none"
      _focus={{
        outline: "none",
        boxShadow: "none",
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: "none",
      }}
      {...rest}
    >
      {label}
    </Link>
  );
}
