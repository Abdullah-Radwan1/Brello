import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FolderKanban, BarChart3 } from 'lucide-react';

const projects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign company website with modern UI',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build iOS and Android mobile applications',
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Q1 2024 marketing campaign planning',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

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
            <Button onClick={() => navigate('/analytics')} variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
                <Button variant="outline" className="w-full">
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
