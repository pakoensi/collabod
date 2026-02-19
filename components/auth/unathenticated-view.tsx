import { ShieldAlertIcon } from "lucide-react";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const UnauthenticatedView = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-lg bg-muted">
        
       
         
            <SignInButton>
            
                Sign in
              
            </SignInButton>
      </div>
    </div>
  );
};
