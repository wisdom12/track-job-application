import { useState } from "react";

type ViewMode = "kanban" | "table";

export function useViewPreference() {
  const [view, setView] = useState<ViewMode>(() => {
    return (localStorage.getItem("job-tracker-view") as ViewMode) || "kanban";
  });

  const setViewMode = (mode: ViewMode) => {
    setView(mode);
    localStorage.setItem("job-tracker-view", mode);
  };

  return { view, setViewMode };
}
