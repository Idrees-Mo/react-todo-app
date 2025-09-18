export interface TodoStatsProps {
  remainingCount: number;
  totalCount: number;
  onClearCompleted: () => void;
  onClearAll: () => void;
}
