
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Part1UI from "@/components/Part1UI";
import Part2CLI from "@/components/Part2CLI";
import { parts, part1Tasks, part2Tasks } from "@/lib/tasks";

const Index = () => {
  const [activePart, setActivePart] = useState("part1");
  const [part1Data, setPart1Data] = useState(parts[0]);
  const [part2Data, setPart2Data] = useState(parts[1]);
  
  const handleTaskComplete = (partId: string, taskId: string, completed: boolean) => {
    if (partId === "part1") {
      const updatedTasks = part1Data.tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      );
      setPart1Data({ ...part1Data, tasks: updatedTasks });
    } else {
      const updatedTasks = part2Data.tasks.map(task => 
        task.id === taskId ? { ...task, completed } : task
      );
      setPart2Data({ ...part2Data, tasks: updatedTasks });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        activePart={activePart} 
        setActivePart={setActivePart} 
        part1Data={part1Data}
        part2Data={part2Data}
      />
      
      <main className="flex-grow">
        {activePart === "part1" && (
          <Part1UI 
            part={part1Data} 
            onTaskComplete={(taskId, completed) => handleTaskComplete("part1", taskId, completed)} 
          />
        )}
        
        {activePart === "part2" && (
          <Part2CLI 
            part={part2Data} 
            onTaskComplete={(taskId, completed) => handleTaskComplete("part2", taskId, completed)} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
