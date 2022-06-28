import { ReactNode } from "react";

export interface CardProps {
  background?: "white" | "blue";
  children: ReactNode;
  className: string;
}
