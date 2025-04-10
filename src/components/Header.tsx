
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

interface HeaderProps {
  activePart: string;
  setActivePart: (part: string) => void;
}

const Header = ({ activePart, setActivePart }: HeaderProps) => {
  const [score, setScore] = useState(0);

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
          <span className="font-bold">Score: {score}/20</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
