
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface FileEditorProps {
  filename: string;
  defaultContent: string;
  onSave: (content: string) => void;
}

const FileEditor = ({ filename, defaultContent, onSave }: FileEditorProps) => {
  const [content, setContent] = useState(defaultContent);

  const handleSave = () => {
    onSave(content);
    toast.success(`${filename} saved successfully`);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-mono">{filename}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="font-mono h-[200px] bg-primary"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} variant="secondary">Save File</Button>
      </CardFooter>
    </Card>
  );
};

export default FileEditor;
