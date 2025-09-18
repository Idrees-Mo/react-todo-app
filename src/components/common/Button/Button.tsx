import React from "react";
import classNames from "classnames";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className,
  ...props
}) => {
  const buttonClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled || loading,
      [styles.loading]: loading,
      [styles.fullWidth]: fullWidth,
    },
    className
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading && !disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};

export default Button;
