"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useProjectsStore } from "@/store/useStore";
import { mockProjects } from "@/lib/mock-data";
import { formatCurrency, formatDate, generateId } from "@/lib/utils";
import {
  Plus,
  Search,
  FolderOpen,
  MapPin,
  Calendar,
  TrendingDown,
  Leaf,
  DollarSign,
  MoreHorizontal,
  ChevronRight,
  BarChart3,
  Recycle,
  X,
} from "lucide-react";

const statusConfig = {
  active: { variant: "accent", label: "Active" },
  planning: { variant: "info", label: "Planning" },
  completed: { variant: "success", label: "Completed" },
  "on-hold": { variant: "warning", label: "On Hold" },
};

function CreateProjectModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    budget: "",
    status: "planning",
    start_date: "",
    end_date: "",
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: generateId(),
      ...form,
      budget: parseFloat(form.budget) || 0,
      spent: 0,
      waste_percentage: 0,
      sustainability_score: 0,
      co2_saved: 0,
      created_at: new Date().toISOString(),
    });
    setForm({ name: "", description: "", location: "", budget: "", status: "planning", start_date: "", end_date: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" description="Add a new construction project to your portfolio" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Project Name" placeholder="e.g., New Capital Residential Phase 3" value={form.name} onChange={handleChange("name")} required />
        <Textarea label="Description" placeholder="Brief project description..." value={form.description} onChange={handleChange("description")} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Location" placeholder="Cairo, Egypt" value={form.location} onChange={handleChange("location")} />
          <Input label="Budget (EGP)" type="number" placeholder="5000000" value={form.budget} onChange={handleChange("budget")} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Select
            label="Status"
            value={form.status}
            onChange={handleChange("status")}
            options={[
              { value: "planning", label: "Planning" },
              { value: "active", label: "Active" },
              { value: "on-hold", label: "On Hold" },
            ]}
          />
          <Input label="Start Date" type="date" value={form.start_date} onChange={handleChange("start_date")} />
          <Input label="End Date" type="date" value={form.end_date} onChange={handleChange("end_date")} />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create Project</Button>
        </div>
      </form>
    </Modal>
  );
}

function ProjectDetailModal({ project, isOpen, onClose }) {
  if (!project) return null;
  const budgetUsed = project.budget > 0 ? (project.spent / project.budget) * 100 : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name} description={project.location} size="xl">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Metrics */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary">Project Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Sustainability", value: `${project.sustainability_score}/100`, icon: Leaf, color: "bg-accent/10 text-accent" },
              { label: "Waste %", value: `${project.waste_percentage}%`, icon: Recycle, color: "bg-emerald-50 text-emerald-600" },
              { label: "CO₂ Saved", value: `${project.co2_saved}t`, icon: TrendingDown, color: "bg-blue-50 text-blue-600" },
              { label: "Status", value: statusConfig[project.status]?.label, icon: BarChart3, color: "bg-amber-50 text-amber-600" },
            ].map((m) => (
              <div key={m.label} className="p-3 rounded-xl border border-border/50">
                <div className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center mb-2`}>
                  <m.icon size={16} />
                </div>
                <p className="text-lg font-bold text-primary">{m.value}</p>
                <p className="text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-primary">Budget Overview</h4>
          <div className="p-4 rounded-xl border border-border/50">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted">Budget Used</span>
              <span className="text-sm font-medium text-primary">{budgetUsed.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full rounded-full ${budgetUsed > 90 ? "bg-danger" : budgetUsed > 70 ? "bg-warning" : "bg-accent"}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetUsed, 100)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted">Spent: {formatCurrency(project.spent)}</span>
              <span className="text-muted">Budget: {formatCurrency(project.budget)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/50">
            <h5 className="text-xs font-medium text-muted uppercase tracking-wide mb-3">Timeline</h5>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-muted">Start</p>
                <p className="text-sm font-medium text-primary">{project.start_date ? formatDate(project.start_date) : "TBD"}</p>
              </div>
              <ChevronRight size={16} className="text-border" />
              <div>
                <p className="text-xs text-muted">End</p>
                <p className="text-sm font-medium text-primary">{project.end_date ? formatDate(project.end_date) : "TBD"}</p>
              </div>
            </div>
          </div>

          {project.description && (
            <div className="p-4 rounded-xl border border-border/50">
              <h5 className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Description</h5>
              <p className="text-sm text-secondary">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default function ProjectsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { projects: storeProjects, addProject } = useProjectsStore();

  // Merge mock + store projects
  const allProjects = useMemo(() => {
    const combined = [...storeProjects, ...mockProjects];
    return combined
      .filter((p) => {
        if (statusFilter !== "all" && p.status !== statusFilter) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
  }, [storeProjects, search, statusFilter]);

  const handleCreateProject = (project) => {
    addProject(project);
  };

  return (
    <PageTransition>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Projects</h1>
          <p className="text-sm text-secondary mt-1">Manage and track all your construction projects</p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus size={16} /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2 h-9 px-3 w-64 bg-white rounded-lg border border-border/50">
          <Search size={16} className="text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/60 outline-none"
          />
        </div>
        <div className="flex gap-1 bg-white rounded-lg border border-border/50 p-0.5">
          {["all", "active", "planning", "completed", "on-hold"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                statusFilter === status ? "bg-primary text-white" : "text-secondary hover:text-primary"
              }`}
            >
              {status === "all" ? "All" : statusConfig[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {allProjects.length === 0 ? (
        <EmptyState
          icon="folder"
          title="No projects found"
          description={search ? "Try a different search term" : "Create your first project to get started"}
          action={!search && <Button onClick={() => setShowCreate(true)}><Plus size={14} /> Create Project</Button>}
        />
      ) : (
        <StaggerContainer className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allProjects.map((project) => {
            const budgetUsed = project.budget > 0 ? (project.spent / project.budget) * 100 : 0;
            return (
              <StaggerItem key={project.id}>
                <Card hover className="cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                        <FolderOpen size={20} className="text-primary/60" />
                      </div>
                      <Badge variant={statusConfig[project.status]?.variant}>
                        {statusConfig[project.status]?.label}
                      </Badge>
                    </div>

                    <h3 className="text-sm font-semibold text-primary mb-1 line-clamp-1">{project.name}</h3>

                    <div className="flex items-center gap-1 text-xs text-muted mb-4">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                    </div>

                    {/* Budget bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">Budget</span>
                        <span className="font-medium text-primary">{budgetUsed.toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            budgetUsed > 90 ? "bg-danger" : budgetUsed > 70 ? "bg-warning" : "bg-accent"
                          }`}
                          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/30">
                      <div className="text-center">
                        <p className="text-xs font-bold text-primary">{project.sustainability_score}</p>
                        <p className="text-[10px] text-muted">Eco Score</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-primary">{project.waste_percentage}%</p>
                        <p className="text-[10px] text-muted">Waste</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-primary">{project.co2_saved}t</p>
                        <p className="text-[10px] text-muted">CO₂ Saved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <CreateProjectModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </PageTransition>
  );
}
