import React from "react";
// import Button from "@/components/common/Button";
import Button from "../common/Button/Button";
import type { TodoFiltersProps, FilterOption } from "./TodoFilters.types";
import type { Filter } from "@/types";
import { FILTERS } from "@/utils/constants";
import styles from "./TodoFilters.module.css";

const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  priorityStats,
  onFilterChange,
}) => {
  const filterOptions: FilterOption[] = [
    { key: FILTERS.ALL, label: "All" },
    { key: FILTERS.ACTIVE, label: "Active" },
    { key: FILTERS.COMPLETED, label: "Completed" },
    { key: FILTERS.HIGH, label: "High Priority", count: priorityStats.high },
    {
      key: FILTERS.MEDIUM,
      label: "Medium Priority",
      count: priorityStats.medium,
    },
    { key: FILTERS.LOW, label: "Low Priority", count: priorityStats.low },
  ];

  const handleFilterClick = (filter: Filter): void => {
    onFilterChange(filter);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterButtons}>
        {filterOptions.map((option) => (
          <Button
            key={option.key}
            onClick={() => handleFilterClick(option.key)}
            variant={currentFilter === option.key ? "primary" : "secondary"}
            size="small"
            className={styles.filterButton}
            aria-pressed={currentFilter === option.key}
          >
            {option.label}
            {typeof option.count === "number" && (
              <span className={styles.count}>({option.count})</span>
            )}
          </Button>
        ))}
      </div>

      <div className={styles.prioritySummary}>
        <span className={styles.summaryItem} style={{ color: "#ff6b6b" }}>
          High: {priorityStats.high}
        </span>
        <span className={styles.summaryItem} style={{ color: "#ffa726" }}>
          Medium: {priorityStats.medium}
        </span>
        <span className={styles.summaryItem} style={{ color: "#66bb6a" }}>
          Low: {priorityStats.low}
        </span>
      </div>
    </div>
  );
};

export default TodoFilters;
