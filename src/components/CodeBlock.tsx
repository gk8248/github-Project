
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, CheckIcon } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = "bash", filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mb-4">
      {filename && (
        <div className="bg-muted px-4 py-1 text-sm font-mono rounded-t-md border-b border-border">
          {filename}
        </div>
      )}
      <pre className="code-block overflow-x-auto">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={handleCopy}
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardCopyIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default CodeBlock;
