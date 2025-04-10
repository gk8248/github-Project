
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Task } from "@/lib/tasks";
import ChecklistItem from "./ChecklistItem";

interface TaskCardProps {
  title: string;
  description: string;
  tasks: Task[];
  onTaskComplete: (taskId: string, completed: boolean) => void;
  totalPoints: number;
}

const TaskCard = ({ title, description, tasks, onTaskComplete, totalPoints }: TaskCardProps) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = (completedTasks / tasks.length) * 100;
  
  const earnedPoints = tasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + task.points, 0);

  return (
    <Card className="mb-6 bg-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress: {completedTasks} of {tasks.length} tasks completed</span>
            <span>{earnedPoints} of {totalPoints} points</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="space-y-2">
          {tasks.map(task => (
            <ChecklistItem 
              key={task.id} 
              task={task} 
              onComplete={onTaskComplete}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Complete all tasks to earn full points.
        </p>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
