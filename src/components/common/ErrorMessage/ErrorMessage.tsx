import React, { useEffect } from "react";
// import Button from "@/components/common/Button";
import type { ErrorMessageProps } from "./ErrorMessage.types";
import styles from "./ErrorMessage.module.css";
import Button from "../Button";

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
  variant = "error",
  autoHide = false,
  duration = 3000,
}) => {
  useEffect(() => {
    if (autoHide && onDismiss) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [autoHide, onDismiss, duration]);

  const getIcon = (): string => {
    switch (variant) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "❌";
    }
  };

  return (
    <div
      className={`${styles.errorMessage} ${styles[variant]}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.icon}>{getIcon()}</span>
        <span className={styles.message}>{message}</span>
      </div>

      {onDismiss && (
        <Button
          onClick={onDismiss}
          variant="secondary"
          size="small"
          className={styles.dismissButton}
          aria-label="Dismiss message"
        >
          ✕
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
