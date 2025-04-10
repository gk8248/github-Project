
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/lib/tasks";

interface ChecklistItemProps {
  task: Task;
  onComplete: (taskId: string, completed: boolean) => void;
}

const ChecklistItem = ({ task, onComplete }: ChecklistItemProps) => {
  const [isChecked, setIsChecked] = useState(task.completed);

  const handleCheck = (checked: boolean) => {
    setIsChecked(checked);
    onComplete(task.id, checked);
  };

  return (
    <div className={`border-l-4 ${isChecked ? "border-secondary" : "border-muted"} pl-4 py-2 mb-4`}>
      <div className="flex items-center space-x-2 mb-1">
        <Checkbox 
          id={task.id} 
          checked={isChecked} 
          onCheckedChange={handleCheck} 
        />
        <label 
          htmlFor={task.id} 
          className={`text-lg font-medium ${isChecked ? "task-complete" : "task-incomplete"}`}
        >
          {task.title} <span className="text-sm font-normal">({task.points} pts)</span>
        </label>
      </div>
      <p className="text-sm text-muted-foreground ml-6">{task.description}</p>
    </div>
  );
};

export default ChecklistItem;
