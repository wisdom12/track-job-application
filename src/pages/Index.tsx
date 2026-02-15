import { useState, useMemo } from "react";
import { useApplications } from "@/hooks/useApplications";
import { useViewPreference } from "@/hooks/useViewPreference";
import { Application, ApplicationStatus, STATUSES } from "@/types/application";
import { StatsBar } from "@/components/StatsBar";
import { KanbanBoard } from "@/components/KanbanBoard";
import { ApplicationTable } from "@/components/ApplicationTable";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationDetail } from "@/components/ApplicationDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, LayoutGrid, List, Search } from "lucide-react";

const Index = () => {
  const { applications, addApplication, updateApplication, deleteApplication, updateStatus } = useApplications();
  const { view, setViewMode } = useViewPreference();

  const [formOpen, setFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | undefined>();
  const [detailApp, setDetailApp] = useState<Application | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = applications;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((a) => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q));
    }
    if (statusFilter !== "all") {
      result = result.filter((a) => a.status === statusFilter);
    }
    return result;
  }, [applications, search, statusFilter]);

  const handleSelect = (app: Application) => {
    setDetailApp(app);
    setDetailOpen(true);
  };

  const handleEdit = (app: Application) => {
    setDetailOpen(false);
    setEditingApp(app);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<Application, "id" | "createdAt" | "updatedAt">) => {
    if (editingApp) {
      updateApplication(editingApp.id, data);
    } else {
      addApplication(data);
    }
    setEditingApp(undefined);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) setEditingApp(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Job Tracker</h1>
          <Button onClick={() => setFormOpen(true)} size="sm">
            <Plus className="mr-1.5 h-4 w-4" /> Add Application
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <StatsBar applications={applications} />

        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1 rounded-lg border bg-muted/50 p-0.5">
            <Button
              variant={view === "kanban" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid className="mr-1.5 h-4 w-4" /> Kanban
            </Button>
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <List className="mr-1.5 h-4 w-4" /> Table
            </Button>
          </div>
        </div>

        {/* Views */}
        {view === "kanban" ? (
          <KanbanBoard applications={filtered} onSelect={handleSelect} onStatusChange={updateStatus} />
        ) : (
          <ApplicationTable applications={filtered} onSelect={handleSelect} onStatusChange={updateStatus} />
        )}
      </main>

      <ApplicationForm
        key={editingApp?.id ?? "new"}
        open={formOpen}
        onOpenChange={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingApp}
      />

      <ApplicationDetail
        application={detailApp}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEdit}
        onDelete={deleteApplication}
      />
    </div>
  );
};

export default Index;
