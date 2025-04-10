
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Part } from "@/lib/tasks";
import TaskCard from "./TaskCard";
import CodeBlock from "./CodeBlock";

interface Part2CLIProps {
  part: Part;
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

const Part2CLI = ({ part, onTaskComplete }: Part2CLIProps) => {
  const [forkedRepoUrl, setForkedRepoUrl] = useState("");
  const [activeTab, setActiveTab] = useState("fork-repo");
  const [clonedRepo, setClonedRepo] = useState(false);
  const [fixedTypo, setFixedTypo] = useState(false);
  const [mergedBranch, setMergedBranch] = useState(false);
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const [branchesUrl, setBranchesUrl] = useState("");

  const sourceRepoUrl = "https://github.com/example/simple-interest-calculator";

  const handleForkRepo = () => {
    setForkedRepoUrl(`https://github.com/username/simple-interest-calculator`);
    toast.success("Repository forked successfully!");
    onTaskComplete("p2-t1", true);
    setActiveTab("clone-repo");
  };

  const handleCloneRepo = () => {
    setClonedRepo(true);
    toast.success("Repository cloned successfully!");
    setActiveTab("fix-typo");
  };

  const handleFixTypo = () => {
    setFixedTypo(true);
    toast.success("Typo fixed and committed!");
    setActiveTab("merge-branches");
  };

  const handleMergeBranches = () => {
    setMergedBranch(true);
    toast.success("Branch merged successfully!");
    onTaskComplete("p2-t2", true);
    setActiveTab("create-pr");
  };

  const handleCreatePullRequest = () => {
    setPullRequestUrl("https://github.com/example/simple-interest-calculator/pull/42");
    toast.success("Pull request created!");
    onTaskComplete("p2-t3", true);
    setActiveTab("check-branches");
  };

  const handleCheckBranches = () => {
    setBranchesUrl("https://github.com/username/simple-interest-calculator/branches");
    toast.success("Branches checked!");
    onTaskComplete("p2-t4", true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-6 mb-4">
              <TabsTrigger value="fork-repo">Fork</TabsTrigger>
              <TabsTrigger value="clone-repo" disabled={!forkedRepoUrl}>Clone</TabsTrigger>
              <TabsTrigger value="fix-typo" disabled={!clonedRepo}>Fix Typo</TabsTrigger>
              <TabsTrigger value="merge-branches" disabled={!fixedTypo}>Merge</TabsTrigger>
              <TabsTrigger value="create-pr" disabled={!mergedBranch}>PR</TabsTrigger>
              <TabsTrigger value="check-branches" disabled={!pullRequestUrl}>Branches</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fork-repo">
              <Card>
                <CardHeader>
                  <CardTitle>Fork Repository</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded">
                      <Label>Source Repository:</Label>
                      <Input value={sourceRepoUrl} readOnly className="mt-2" />
                    </div>
                    
                    <Button onClick={handleForkRepo} className="github-btn">
                      Fork Repository
                    </Button>
                    
                    {forkedRepoUrl && (
                      <div className="mt-4 p-4 bg-muted rounded">
                        <Label>Forked Repository URL:</Label>
                        <div className="flex items-center mt-2">
                          <Input value={forkedRepoUrl} readOnly />
                          <Button 
                            onClick={() => {
                              navigator.clipboard.writeText(forkedRepoUrl);
                              toast.success("URL copied to clipboard");
                            }}
                            variant="outline" 
                            className="ml-2"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clone-repo">
              <Card>
                <CardHeader>
                  <CardTitle>Clone Repository</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CodeBlock 
                      code={`git clone ${forkedRepoUrl} simple-interest-calculator
cd simple-interest-calculator`} 
                    />
                    
                    <Button onClick={handleCloneRepo} className="github-btn">
                      Run Commands
                    </Button>

                    {clonedRepo && (
                      <div className="mt-4 p-4 bg-muted rounded text-sm font-mono">
                        <p className="text-green-500">Cloning into 'simple-interest-calculator'...</p>
                        <p className="text-green-500">remote: Enumerating objects: 15, done.</p>
                        <p className="text-green-500">remote: Counting objects: 100% (15/15), done.</p>
                        <p className="text-green-500">remote: Compressing objects: 100% (10/10), done.</p>
                        <p className="text-green-500">remote: Total 15 (delta 1), reused 15 (delta 1), pack-reused 0</p>
                        <p className="text-green-500">Receiving objects: 100% (15/15), done.</p>
                        <p className="text-green-500">Resolving deltas: 100% (1/1), done.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fix-typo">
              <Card>
                <CardHeader>
                  <CardTitle>Fix Typo in README.md</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CodeBlock 
                      code={`git checkout -b bug-fix-typo
nano README.md  # Change 2022 XYZ, Inc. to 2023 XYZ, Inc.
git add README.md
git commit -m "Fix copyright year in README.md"
git push origin bug-fix-typo`} 
                    />
                    
                    <div className="p-4 bg-muted rounded">
                      <p className="text-sm font-bold mb-2">Change from:</p>
                      <CodeBlock code="2022 XYZ, Inc." filename="README.md" />
                      <p className="text-sm font-bold mb-2">Change to:</p>
                      <CodeBlock code="2023 XYZ, Inc." filename="README.md" />
                    </div>
                    
                    <Button onClick={handleFixTypo} className="github-btn">
                      Fix and Commit
                    </Button>

                    {fixedTypo && (
                      <div className="mt-4 p-4 bg-muted rounded text-sm font-mono">
                        <p className="text-green-500">Switched to a new branch 'bug-fix-typo'</p>
                        <p className="text-green-500">[bug-fix-typo 3e4c5d6] Fix copyright year in README.md</p>
                        <p className="text-green-500">1 file changed, 1 insertion(+), 1 deletion(-)</p>
                        <p className="text-green-500">Enumerating objects: 5, done.</p>
                        <p className="text-green-500">Counting objects: 100% (5/5), done.</p>
                        <p className="text-green-500">Writing objects: 100% (3/3), 294 bytes | 294.00 KiB/s, done.</p>
                        <p className="text-green-500">Total 3 (delta 2), reused 0 (delta 0), pack-reused 0</p>
                        <p className="text-green-500">remote: Processing changes: refs: 1, done</p>
                        <p className="text-green-500">To https://github.com/username/simple-interest-calculator</p>
                        <p className="text-green-500"> * [new branch]      bug-fix-typo -&gt; bug-fix-typo</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="merge-branches">
              <Card>
                <CardHeader>
                  <CardTitle>Merge Branch with Main</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <CodeBlock 
                      code={`git checkout main
git merge bug-fix-typo
git push origin main`} 
                    />
                    
                    <Button onClick={handleMergeBranches} className="github-btn">
                      Merge Branches
                    </Button>

                    {mergedBranch && (
                      <div className="mt-4 space-y-4">
                        <div className="p-4 bg-muted rounded text-sm font-mono">
                          <p className="text-green-500">Switched to branch 'main'</p>
                          <p className="text-green-500">Updating a1b2c3d..3e4c5d6</p>
                          <p className="text-green-500">Fast-forward</p>
                          <p className="text-green-500"> README.md | 2 +-</p>
                          <p className="text-green-500"> 1 file changed, 1 insertion(+), 1 deletion(-)</p>
                          <p className="text-green-500">To https://github.com/username/simple-interest-calculator</p>
                          <p className="text-green-500">   a1b2c3d..3e4c5d6  main -&gt; main</p>
                        </div>
                        
                        <div className="p-4 bg-muted rounded">
                          <Label>Take a screenshot of this merge result and save it as merge_branches.png</Label>
                          <div className="mt-4 border border-dashed border-muted-foreground p-4 flex items-center justify-center">
                            <img 
                              src="/lovable-uploads/cf260c4d-4dad-40b7-b2f6-9147ee8a2949.png"
                              alt="Screenshot of merge result"
                              className="max-w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="create-pr">
              <Card>
                <CardHeader>
                  <CardTitle>Create Pull Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Now create a Pull Request from your forked repository to the original repository:</p>
                    
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Go to your forked repository on GitHub</li>
                      <li>Click on "Contribute" {">"} "Open pull request"</li>
                      <li>Fill in the PR title and description</li>
                      <li>Click "Create pull request"</li>
                    </ol>
                    
                    <Button onClick={handleCreatePullRequest} className="github-btn">
                      Create Pull Request
                    </Button>
                    
                    {pullRequestUrl && (
                      <div className="mt-4 p-4 bg-muted rounded">
                        <Label>Pull Request URL:</Label>
                        <div className="flex items-center mt-2">
                          <Input value={pullRequestUrl} readOnly />
                          <Button 
                            onClick={() => {
                              navigator.clipboard.writeText(pullRequestUrl);
                              toast.success("URL copied to clipboard");
                            }}
                            variant="outline" 
                            className="ml-2"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="check-branches">
              <Card>
                <CardHeader>
                  <CardTitle>Check Branch Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Navigate to the Branches page to see all branches and their status:</p>
                    
                    <Button onClick={handleCheckBranches} className="github-btn">
                      View Branches
                    </Button>
                    
                    {branchesUrl && (
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded">
                          <Label>Branches URL:</Label>
                          <div className="flex items-center mt-2">
                            <Input value={branchesUrl} readOnly />
                            <Button 
                              onClick={() => {
                                navigator.clipboard.writeText(branchesUrl);
                                toast.success("URL copied to clipboard");
                              }}
                              variant="outline" 
                              className="ml-2"
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-muted rounded">
                          <Label>Branch Status:</Label>
                          <div className="mt-4 border border-dashed border-muted-foreground p-4">
                            <div className="flex items-center justify-between p-2 border-b">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="font-medium">main</span>
                              </div>
                              <span className="text-sm text-muted-foreground">Default branch</span>
                            </div>
                            <div className="flex items-center justify-between p-2 border-b">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="font-medium">bug-fix-typo</span>
                              </div>
                              <span className="text-sm text-muted-foreground">Merged to main</span>
                            </div>
                            <div className="flex items-center justify-between p-2">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="font-medium">bug-fix-revert</span>
                              </div>
                              <span className="text-sm text-muted-foreground">Active branch</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <TaskCard
            title={part.title}
            description={part.description}
            tasks={part.tasks}
            onTaskComplete={onTaskComplete}
            totalPoints={part.totalPoints}
          />
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Fork the repository</li>
                <li>Clone the forked repository</li>
                <li>Create a branch named "bug-fix-typo"</li>
                <li>Fix the copyright year in README.md</li>
                <li>Commit and push your changes</li>
                <li>Merge the branch to main</li>
                <li>Create a pull request</li>
                <li>Check branch status</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Part2CLI;
