import { useState, useCallback } from "react";
import type { ValidationResult } from "@/types";

interface UseValidationOptions {
  showErrorsOnChange?: boolean;
  clearErrorsOnSuccess?: boolean;
}

interface UseValidationReturn {
  errors: Record<string, string>;
  hasErrors: boolean;
  validate: (validationFn: () => ValidationResult) => boolean;
  clearErrors: () => void;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
}

export const useValidation = (
  options: UseValidationOptions = {}
): UseValidationReturn => {
  const { showErrorsOnChange = true, clearErrorsOnSuccess = true } = options;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(
    (validationFn: () => ValidationResult): boolean => {
      const result = validationFn();

      if (result.isValid) {
        if (clearErrorsOnSuccess) {
          setErrors({});
        }
        return true;
      } else {
        if (showErrorsOnChange) {
          setErrors(result.errors);
        }
        return false;
      }
    },
    [showErrorsOnChange, clearErrorsOnSuccess]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setError = useCallback((field: string, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    hasErrors,
    validate,
    clearErrors,
    setError,
    clearError,
  };
};
