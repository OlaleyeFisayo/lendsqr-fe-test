import type { ComponentPropsWithoutRef } from "react";

type LogoProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  alt?: string;
};

export default function Logo({
  alt = "Lendsqr",
  height = 36,
  width = 173.76,
  ...props
}: LogoProps) {
  return (
    <img
      alt={alt}
      height={height}
      src="/logo-long.svg"
      width={width}
      {...props}
    />
  );
}
