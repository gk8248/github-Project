
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
import FileEditor from "./FileEditor";

interface Part1UIProps {
  part: Part;
  onTaskComplete: (taskId: string, completed: boolean) => void;
}

const Part1UI = ({ part, onTaskComplete }: Part1UIProps) => {
  const [repoName, setRepoName] = useState("github-final-project");
  const [repoUrl, setRepoUrl] = useState("");
  const [activeTab, setActiveTab] = useState("create-repo");
  const [createdRepo, setCreatedRepo] = useState(false);
  
  const readmeContent = `# Simple Interest Calculator

A calculator that calculates simple interest given principal, annual rate of interest and time period in years.

## Input:
   p, principal amount
   t, time period in years
   r, annual rate of interest
   
## Output
   simple interest = p*t*r
`;

  const licenseContent = `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   Copyright 2023 XYZ, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`;

  const codeOfConductContent = `# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the
  overall community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or
  advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email
  address, without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.`;

  const contributingContent = `# Contributing

All contributions, bug reports, bug fixes, documentation improvements, enhancements, and ideas are welcome.`;

  const shellScriptContent = `#!/bin/bash
# This script calculates simple interest given principal,
# annual rate of interest and time period in years.

# Do not use this in production. Sample purpose only.

# Author: Upkar Lidder (IBM)
# Additional Authors:
# <your GitHub username>

# Input:
# p, principal amount
# t, time period in years
# r, annual rate of interest

# Output:
# simple interest = p*t*r

echo "Enter the principal:"
read p
echo "Enter rate of interest per year:"
read r
echo "Enter time period in years:"
read t

s=$(expr $p \\* $t \\* $r / 100)
echo "The simple interest is: $s"`;

  const handleCreateRepo = () => {
    if (!repoName) {
      toast.error("Repository name is required");
      return;
    }
    
    setCreatedRepo(true);
    setRepoUrl(`https://github.com/username/${repoName}`);
    toast.success("Repository created successfully!");
    onTaskComplete("p1-t1", true);
    setActiveTab("add-license");
    onTaskComplete("p1-t2", true);
  };

  const handleSaveReadme = () => {
    toast.success("README.md updated successfully!");
    onTaskComplete("p1-t3", true);
    setActiveTab("add-code-conduct");
  };

  const handleSaveCodeOfConduct = () => {
    toast.success("CODE_OF_CONDUCT.md added successfully!");
    onTaskComplete("p1-t4", true);
    setActiveTab("add-contributing");
  };

  const handleSaveContributing = () => {
    toast.success("CONTRIBUTING.md added successfully!");
    onTaskComplete("p1-t5", true);
    setActiveTab("add-script");
  };

  const handleSaveScript = () => {
    toast.success("simple-interest.sh added successfully!");
    onTaskComplete("p1-t6", true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="create-repo">Create Repository</TabsTrigger>
              <TabsTrigger value="add-license" disabled={!createdRepo}>Add License</TabsTrigger>
              <TabsTrigger value="add-files" disabled={!createdRepo}>Add Files</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create-repo">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New GitHub Repository</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="repo-name">Repository Name</Label>
                      <Input 
                        id="repo-name" 
                        value={repoName} 
                        onChange={(e) => setRepoName(e.target.value)}
                        placeholder="github-final-project"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="add-readme" 
                        className="h-4 w-4" 
                        defaultChecked 
                      />
                      <Label htmlFor="add-readme">Add a README file</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="choose-license" 
                        className="h-4 w-4" 
                        defaultChecked 
                      />
                      <Label htmlFor="choose-license">Choose a license</Label>
                      <select className="ml-2 border rounded p-1 text-sm bg-muted text-foreground">
                        <option>Apache 2.0 License</option>
                      </select>
                    </div>
                    
                    <Button onClick={handleCreateRepo} className="github-btn">
                      Create repository
                    </Button>
                    
                    {repoUrl && (
                      <div className="mt-4 p-4 bg-muted rounded">
                        <Label>Repository URL:</Label>
                        <div className="flex items-center mt-2">
                          <Input value={repoUrl} readOnly />
                          <Button 
                            onClick={() => {
                              navigator.clipboard.writeText(repoUrl);
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
            
            <TabsContent value="add-license">
              <FileEditor
                filename="LICENSE"
                defaultContent={licenseContent}
                onSave={() => {
                  setActiveTab("add-files");
                }}
              />
            </TabsContent>
            
            <TabsContent value="add-files">
              <Tabs defaultValue="readme">
                <TabsList className="w-full grid grid-cols-4">
                  <TabsTrigger value="readme">README.md</TabsTrigger>
                  <TabsTrigger value="code-conduct">CODE_OF_CONDUCT.md</TabsTrigger>
                  <TabsTrigger value="contributing">CONTRIBUTING.md</TabsTrigger>
                  <TabsTrigger value="script">simple-interest.sh</TabsTrigger>
                </TabsList>
                
                <TabsContent value="readme">
                  <FileEditor
                    filename="README.md"
                    defaultContent={readmeContent}
                    onSave={handleSaveReadme}
                  />
                </TabsContent>
                
                <TabsContent value="code-conduct">
                  <FileEditor
                    filename="CODE_OF_CONDUCT.md"
                    defaultContent={codeOfConductContent}
                    onSave={handleSaveCodeOfConduct}
                  />
                </TabsContent>
                
                <TabsContent value="contributing">
                  <FileEditor
                    filename="CONTRIBUTING.md"
                    defaultContent={contributingContent}
                    onSave={handleSaveContributing}
                  />
                </TabsContent>
                
                <TabsContent value="script">
                  <FileEditor
                    filename="simple-interest.sh"
                    defaultContent={shellScriptContent}
                    onSave={handleSaveScript}
                  />
                </TabsContent>
              </Tabs>
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
                <li>Create a new GitHub repository called "github-final-project"</li>
                <li>Add the Apache 2.0 license</li>
                <li>Update the README.md with required information</li>
                <li>Add a CODE_OF_CONDUCT.md file</li>
                <li>Add a CONTRIBUTING.md file</li>
                <li>Add the simple-interest.sh script</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Part1UI;
