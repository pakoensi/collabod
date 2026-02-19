import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger,DialogTitle } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const InviteButton =()=>{

    return(
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Invite members
            </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-220">
                  <VisuallyHidden>
          <DialogTitle>Invite Members</DialogTitle>
        </VisuallyHidden>
                <OrganizationProfile routing="hash"  />
            </DialogContent>
        </Dialog>
    )
}