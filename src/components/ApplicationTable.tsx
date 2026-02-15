import { Application, ApplicationStatus, STATUSES } from "@/types/application";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const badgeColors: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  Interview: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  Offer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

interface ApplicationTableProps {
  applications: Application[];
  onSelect: (app: Application) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

export function ApplicationTable({ applications, onSelect, onStatusChange }: ApplicationTableProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "—";
    const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;
    if (min && max) return `${fmt(min)} – ${fmt(max)}`;
    return min ? fmt(min) : max ? fmt(max) : "—";
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Date Applied</TableHead>
            <TableHead className="hidden lg:table-cell">Salary</TableHead>
            <TableHead className="hidden lg:table-cell">Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="cursor-pointer" onClick={() => onSelect(app)}>
              <TableCell className="font-medium">{app.company}</TableCell>
              <TableCell>{app.role}</TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Select value={app.status} onValueChange={(v) => onStatusChange(app.id, v as ApplicationStatus)}>
                  <SelectTrigger className="h-7 w-[110px] border-0 px-0">
                    <Badge className={`${badgeColors[app.status]} border-0`}>{app.status}</Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {app.dateApplied ? format(new Date(app.dateApplied), "MMM d, yyyy") : "—"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{formatSalary(app.salaryMin, app.salaryMax)}</TableCell>
              <TableCell className="hidden lg:table-cell">{app.location || "—"}</TableCell>
            </TableRow>
          ))}
          {applications.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
