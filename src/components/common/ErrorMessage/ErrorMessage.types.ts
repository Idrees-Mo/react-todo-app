export interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
  variant?: "error" | "warning" | "info";
  autoHide?: boolean;
  duration?: number;
}
