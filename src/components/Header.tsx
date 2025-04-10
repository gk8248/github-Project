
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { Part } from "@/lib/tasks";

interface HeaderProps {
  activePart: string;
  setActivePart: (part: string) => void;
  part1Data?: Part;
  part2Data?: Part;
}

const Header = ({ activePart, setActivePart, part1Data, part2Data }: HeaderProps) => {
  // Calculate total score based on completed tasks
  const calculateScore = () => {
    let total = 0;
    
    if (part1Data) {
      total += part1Data.tasks.filter(task => task.completed)
        .reduce((sum, task) => sum + task.points, 0);
    }
    
    if (part2Data) {
      total += part2Data.tasks.filter(task => task.completed)
        .reduce((sum, task) => sum + task.points, 0);
    }
    
    return total;
  };

  const totalScore = calculateScore();
  const maxScore = 20; // Total possible score

  return (
    <div className="github-header sticky top-0 z-10">
      <div className="flex items-center space-x-4">
        <GithubIcon className="h-8 w-8" />
        <h1 className="text-xl font-bold">Git-Grade-Wizard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant={activePart === "part1" ? "secondary" : "ghost"} 
          onClick={() => setActivePart("part1")}
        >
          Part 1: GitHub UI
        </Button>
        <Button 
          variant={activePart === "part2" ? "secondary" : "ghost"} 
          onClick={() => setActivePart("part2")}
        >
          Part 2: Git CLI
        </Button>
        <div className="bg-muted px-4 py-2 rounded-md">
          <span className="font-bold">Score: {totalScore}/{maxScore}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
