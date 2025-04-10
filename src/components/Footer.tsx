
import { GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-foreground p-6 mt-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <GithubIcon className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold">Git-Grade-Wizard</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Created for GitHub and Git learning assessment</p>
            <p>© {new Date().getFullYear()} Git-Grade-Wizard. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
