
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface Part {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  totalPoints: number;
}

export const part1Tasks: Task[] = [
  {
    id: "p1-t1",
    title: "Submit the URL of the repository",
    description: "Create and submit a GitHub repository URL",
    completed: false,
    points: 2
  },
  {
    id: "p1-t2",
    title: "Apache 2.0 License file",
    description: "Include an Apache 2.0 license file named LICENSE in the repository",
    completed: false,
    points: 2
  },
  {
    id: "p1-t3",
    title: "README.md file",
    description: "Create a README.md file with required information",
    completed: false,
    points: 2
  },
  {
    id: "p1-t4",
    title: "CODE_OF_CONDUCT file",
    description: "Include a CODE_OF_CONDUCT.md file using the Contributor Covenant template",
    completed: false,
    points: 2
  },
  {
    id: "p1-t5",
    title: "CONTRIBUTING.md file",
    description: "Add a CONTRIBUTING.md file with contribution guidelines",
    completed: false,
    points: 2
  },
  {
    id: "p1-t6",
    title: "simple-interest.sh file",
    description: "Include the simple-interest.sh script file",
    completed: false,
    points: 2
  }
];

export const part2Tasks: Task[] = [
  {
    id: "p2-t1",
    title: "Submit the URL of the forked repository",
    description: "Fork the provided repository and submit its URL",
    completed: false,
    points: 2
  },
  {
    id: "p2-t2",
    title: "Submit the screenshot of the first merge",
    description: "Merge bug-fix-typo branch to main and take a screenshot",
    completed: false,
    points: 2
  },
  {
    id: "p2-t3",
    title: "Submit the URL of the pull request",
    description: "Create a pull request and submit its URL",
    completed: false,
    points: 2
  },
  {
    id: "p2-t4",
    title: "Submit the URL of the Branches page",
    description: "Submit the URL of the Branches page showing branch names and status",
    completed: false,
    points: 2
  }
];

export const parts: Part[] = [
  {
    id: "part1",
    title: "Part 1: GitHub UI",
    description: "Create a GitHub repository with required files",
    tasks: part1Tasks,
    totalPoints: 12
  },
  {
    id: "part2",
    title: "Part 2: Git CLI",
    description: "Fork, clone, branch, merge, and create pull requests",
    tasks: part2Tasks,
    totalPoints: 8
  }
];
