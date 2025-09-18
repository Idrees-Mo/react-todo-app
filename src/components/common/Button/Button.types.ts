import type { ReactNode, ButtonHTMLAttributes } from "react";
import type { ButtonVariant, ButtonSize } from "@/types/common";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}
