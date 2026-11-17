import type { ReactNode } from "react";

/** Placeholder shown when a dashboard section has no data yet. */
export default function EmptyState({
  icon,
  title,
  copy,
  action,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <strong>{title}</strong>
      <p>{copy}</p>
      {action}
    </div>
  );
}
