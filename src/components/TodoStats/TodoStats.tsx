import React from "react";
import Button from "@/components/common/Button";
import type { TodoStatsProps } from "./TodoStats.types";
import styles from "./TodoStats.module.css";

const TodoStats: React.FC<TodoStatsProps> = ({
  remainingCount,
  totalCount,
  onClearCompleted,
  onClearAll,
}) => {
  const completedCount = totalCount - remainingCount;
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className={styles.stats}>
      <div className={styles.info}>
        <div className={styles.counts}>
          <span className={styles.remaining}>
            {remainingCount} item{remainingCount !== 1 ? "s" : ""} left
          </span>
          <div className={styles.details}>
            Total: {totalCount} | Completed: {completedCount} |{" "}
            {completionPercentage}%
          </div>
        </div>

        {totalCount > 0 && (
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${completionPercentage}%` }}
              aria-label={`${completionPercentage}% complete`}
            />
          </div>
        )}
      </div>

      <div className={styles.actions}>
        {completedCount > 0 && (
          <Button
            onClick={onClearCompleted}
            variant="warning"
            size="small"
            aria-label={`Clear ${completedCount} completed todo${completedCount !== 1 ? "s" : ""}`}
          >
            Clear Completed
          </Button>
        )}

        {totalCount > 0 && (
          <Button
            onClick={onClearAll}
            variant="danger"
            size="small"
            aria-label="Clear all todos"
          >
            Clear All Data
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoStats;
