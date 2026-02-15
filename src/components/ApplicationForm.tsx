import { useState } from "react";
import { Application, ApplicationStatus, STATUSES } from "@/types/application";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApplicationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Application, "id" | "createdAt" | "updatedAt">) => void;
  initialData?: Application;
}

export function ApplicationForm({ open, onOpenChange, onSubmit, initialData }: ApplicationFormProps) {
  const [company, setCompany] = useState(initialData?.company ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [status, setStatus] = useState<ApplicationStatus>(initialData?.status ?? "Applied");
  const [dateApplied, setDateApplied] = useState(initialData?.dateApplied ?? new Date().toISOString().split("T")[0]);
  const [salaryMin, setSalaryMin] = useState(initialData?.salaryMin?.toString() ?? "");
  const [salaryMax, setSalaryMax] = useState(initialData?.salaryMax?.toString() ?? "");
  const [location, setLocation] = useState(initialData?.location ?? "");
  const [contactPerson, setContactPerson] = useState(initialData?.contactPerson ?? "");
  const [jobUrl, setJobUrl] = useState(initialData?.jobUrl ?? "");
  const [deadline, setDeadline] = useState(initialData?.deadline ?? "");
  const [notes, setNotes] = useState(initialData?.notes ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      company,
      role,
      status,
      dateApplied,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      location: location || undefined,
      contactPerson: contactPerson || undefined,
      jobUrl: jobUrl || undefined,
      deadline: deadline || undefined,
      notes: notes || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Application" : "Add Application"}</DialogTitle>
          <DialogDescription>
            {initialData ? "Update the details for this application." : "Track a new job application."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role / Title *</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ApplicationStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateApplied">Date Applied</Label>
              <Input id="dateApplied" type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Salary Min</Label>
              <Input id="salaryMin" type="number" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} placeholder="e.g. 80000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salaryMax">Salary Max</Label>
              <Input id="salaryMax" type="number" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} placeholder="e.g. 120000" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote, NYC, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input id="jobUrl" type="url" value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any notes about this application..." rows={3} />
          </div>

          <Button type="submit" className="w-full">{initialData ? "Save Changes" : "Add Application"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
