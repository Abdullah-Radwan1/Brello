import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { Navbar } from '@/components/Navbar';
import { KanbanColumn } from '@/components/KanbanColumn';
import { TaskModal } from '@/components/TaskModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useUI } from '@/lib/uiStore';
import { toast } from '@/hooks/use-toast';

export default function ProjectBoard() {
  const { id } = useParams<{ id: string }>();
  const { isTaskModalOpen, openTaskModal, closeTaskModal } = useUI();
  const [tasks] = useState<any[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    toast({ title: 'Task moved' });
  };

  const handleTaskSave = async (data: any) => {
    toast({ title: 'Task saved' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Project Board</h1>
            <p className="text-muted-foreground mt-1">Manage your tasks with drag and drop</p>
          </div>
          <Button onClick={() => openTaskModal()}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            <KanbanColumn
              status="TODO"
              title="To Do"
              tasks={[]}
              onTaskClick={openTaskModal}
            />
            <KanbanColumn
              status="IN_PROGRESS"
              title="In Progress"
              tasks={[]}
              onTaskClick={openTaskModal}
            />
            <KanbanColumn
              status="REVIEW"
              title="Review"
              tasks={[]}
              onTaskClick={openTaskModal}
            />
            <KanbanColumn
              status="DONE"
              title="Done"
              tasks={[]}
              onTaskClick={openTaskModal}
            />
          </div>
        </DndContext>
      </main>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={null}
        projectId={id!}
        onSave={handleTaskSave}
      />
    </div>
  );
}
