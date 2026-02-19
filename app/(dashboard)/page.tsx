// "use client"

import { useOrganization } from "@clerk/nextjs"
import { EmptyOrg } from "./_components/empty-org"
import { auth, Organization } from "@clerk/nextjs/server"
import { BoardList } from "./_components/board-list";

interface DashboardPageProps{
    searchParams:{
        search?:string;
        favorites?:string
    }
}
const DashboardPage =async({searchParams}:DashboardPageProps)=>{
    const { orgId } = await auth()
    const params= await searchParams
    const {search,favorites}= params
    // const {organization} = useOrganization()
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            
               
            {!orgId ?(

            <EmptyOrg />
            ):(
               <BoardList 
               orgId={orgId}
               query={params}
               />
            )
        }
            </div>
    )
}

export default DashboardPage