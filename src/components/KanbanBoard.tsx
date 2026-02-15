import { Application, ApplicationStatus, STATUSES } from "@/types/application";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const columnColors: Record<ApplicationStatus, string> = {
  Applied: "border-t-blue-500",
  Interview: "border-t-amber-500",
  Offer: "border-t-emerald-500",
  Rejected: "border-t-red-500",
};

const badgeVariants: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

interface KanbanBoardProps {
  applications: Application[];
  onSelect: (app: Application) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export function KanbanBoard({ applications, onSelect, onStatusChange }: KanbanBoardProps) {
  const columns = STATUSES.map((status) => ({
    status,
    items: applications.filter((a) => a.status === status),
  }));

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("applicationId", id);
  };

  const handleDrop = (e: React.DragEvent, status: ApplicationStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("applicationId");
    if (id) onStatusChange(id, status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {columns.map(({ status, items }) => (
        <div
          key={status}
          className={`rounded-lg border border-t-4 bg-muted/30 p-3 ${columnColors[status]}`}
          onDrop={(e) => handleDrop(e, status)}
          onDragOver={handleDragOver}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{status}</h3>
            <Badge variant="secondary" className="text-xs">{items.length}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            {items.map((app) => (
              <Card
                key={app.id}
                className="cursor-pointer border shadow-sm transition-shadow hover:shadow-md"
                draggable
                onDragStart={(e) => handleDragStart(e, app.id)}
                onClick={() => onSelect(app)}
              >
                <CardContent className="p-3">
                  <p className="font-medium leading-tight">{app.company}</p>
                  <p className="text-sm text-muted-foreground">{app.role}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {app.dateApplied ? format(new Date(app.dateApplied), "MMM d, yyyy") : "No date"}
                  </p>
                  {app.location && (
                    <p className="mt-1 text-xs text-muted-foreground">{app.location}</p>
                  )}
                </CardContent>
              </Card>
            ))}
            {items.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">Drop here</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
