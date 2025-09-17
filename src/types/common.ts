import { ReactNode } from "react";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";

export type ButtonSize = "small" | "medium" | "large";

export interface ErrorState {
  hasError: boolean;
  message: string;
  field?: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
