"use client"

import { Hint } from "@/components/hint"
import { DialogContent, DialogTrigger,Dialog,DialogTitle } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import { Plus } from "lucide-react"

export const NewButton =()=>{
    return(
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="aspect-square">
                        <Hint label="Create organization" side="right" align="start" sideOffSet={18}>

                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Plus className="text-white" />
                    </button>
                        </Hint>
                    </div>
                </DialogTrigger>
               <DialogContent className="max-w-[480px] bg-transparent border-none p-0 flex items-center justify-center" >
            <DialogTitle className="sr-only">
          Create Organization
        </DialogTitle>

        <CreateOrganization />
               </DialogContent>
            </Dialog>
        </div>
    )
}