import { useState, useEffect, useCallback } from "react";
import { Application, ApplicationStatus } from "@/types/application";

const STORAGE_KEY = "job-applications";

function loadApplications(): Application[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveApplications(apps: Application[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>(loadApplications);

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  const addApplication = useCallback((app: Omit<Application, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newApp: Application = {
      ...app,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<Omit<Application, "id" | "createdAt">>) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...updates, updatedAt: new Date().toISOString() } : app
      )
    );
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const updateStatus = useCallback((id: string, status: ApplicationStatus) => {
    updateApplication(id, { status });
  }, [updateApplication]);

  return { applications, addApplication, updateApplication, deleteApplication, updateStatus };
}
