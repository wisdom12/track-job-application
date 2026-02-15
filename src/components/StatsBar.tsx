import { Card, CardContent } from "@/components/ui/card";
import { Application, STATUSES, ApplicationStatus } from "@/types/application";
import { Briefcase, PhoneCall, Trophy, XCircle } from "lucide-react";

const iconMap: Record<ApplicationStatus, React.ReactNode> = {
  Applied: <Briefcase className="h-5 w-5" />,
  Interview: <PhoneCall className="h-5 w-5" />,
  Offer: <Trophy className="h-5 w-5" />,
  Rejected: <XCircle className="h-5 w-5" />,
};

const colorMap: Record<ApplicationStatus, string> = {
  Applied: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950",
  Interview: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950",
  Offer: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950",
  Rejected: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950",
};

interface StatsBarProps {
  applications: Application[];
}

export function StatsBar({ applications }: StatsBarProps) {
  const counts = STATUSES.reduce((acc, status) => {
    acc[status] = applications.filter((a) => a.status === status).length;
    return acc;
  }, {} as Record<ApplicationStatus, number>);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATUSES.map((status) => (
        <Card key={status} className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`rounded-lg p-2.5 ${colorMap[status]}`}>
              {iconMap[status]}
            </div>
            <div>
              <p className="text-2xl font-bold">{counts[status]}</p>
              <p className="text-xs text-muted-foreground">{status}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
