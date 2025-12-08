import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, FolderKanban, BarChart3 } from "lucide-react";
import { useProjects } from "@/lib/hooks/use_projects";
import AddProject from "@/components/utils/AddProject";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: projects, isLoading, isError, error } = useProjects();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your projects and track progress
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/analytics")} variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <AddProject />
          </div>
        </div>

        {/* Loading and error states */}
        {isLoading && <div>Loading projects...</div>}
        {isError && <div className="text-red-500">Error: {error?.message}</div>}

        {/* Projects grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FolderKanban className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  View Board
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
