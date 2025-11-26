import { Card } from '@/components/ui/card';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: string;
  title: string;
  tasks: any[];
  onTaskClick: (task?: any) => void;
}

const statusColors: Record<string, string> = {
  TODO: 'border-muted',
  IN_PROGRESS: 'border-info',
  REVIEW: 'border-warning',
  DONE: 'border-success',
};

export function KanbanColumn({ status, title, tasks, onTaskClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex flex-col min-w-[300px] flex-1">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <Card
        ref={setNodeRef}
        className={cn(
          'flex-1 p-4 border-t-4 transition-colors min-h-[400px]',
          statusColors[status],
          isOver && 'bg-muted/50'
        )}
      >
        <SortableContext items={tasks.map(t => t.id || '')} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No tasks yet
            </div>
          )}
        </SortableContext>
      </Card>
    </div>
  );
}
