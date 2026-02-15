import { Application, ApplicationStatus, STATUSES } from "@/types/application";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ExternalLink, Trash2, Pencil } from "lucide-react";

const badgeColors: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

interface ApplicationDetailProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

export function ApplicationDetail({ application, open, onOpenChange, onEdit, onDelete }: ApplicationDetailProps) {
  if (!application) return null;

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return null;
    const fmt = (n: number) => `$${n.toLocaleString()}`;
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    return min ? fmt(min) : max ? `Up to ${fmt(max)}` : null;
  };

  const salary = formatSalary(application.salaryMin, application.salaryMax);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <DialogTitle className="text-xl">{application.company}</DialogTitle>
              <DialogDescription className="text-base">{application.role}</DialogDescription>
            </div>
            <Badge className={`${badgeColors[application.status]} border-0 shrink-0`}>
              {application.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-3 text-sm">
          <DetailRow label="Date Applied" value={application.dateApplied ? format(new Date(application.dateApplied), "MMMM d, yyyy") : undefined} />
          {salary && <DetailRow label="Salary Range" value={salary} />}
          <DetailRow label="Location" value={application.location} />
          <DetailRow label="Contact Person" value={application.contactPerson} />
          <DetailRow label="Deadline" value={application.deadline ? format(new Date(application.deadline), "MMMM d, yyyy") : undefined} />
          {application.jobUrl && (
            <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
              <span className="text-muted-foreground">Job URL</span>
              <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          {application.notes && (
            <div className="rounded-md bg-muted/50 p-3">
              <span className="text-xs font-medium text-muted-foreground">Notes</span>
              <p className="mt-1 whitespace-pre-wrap">{application.notes}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => onEdit(application)}>
            <Pencil className="mr-1.5 h-4 w-4" /> Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              onDelete(application.id);
              onOpenChange(false);
            }}
          >
            <Trash2 className="mr-1.5 h-4 w-4" /> Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
