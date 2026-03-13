// "use client"

// import { useOrganization } from "@clerk/nextjs"
// import { EmptyOrg } from "../_components/empty-org"
// import { auth, Organization } from "@clerk/nextjs/server"
// import { BoardList } from "../_components/board-list";

// interface DashboardPageProps{
//     searchParams:{
//         search?:string;
//         favorites?:string
//     }
// }
// const DashboardPage =async({searchParams}:DashboardPageProps)=>{
//     const { orgId,userId } = await auth()
//     const params= await searchParams
//     const {search,favorites}= params
//     // const {organization} = useOrganization()
//       // 👇 Not logged in
//   if (!userId) {
//     return <div>Homer</div>
//   }

//     return (
//         <div className="flex-1 h-[calc(100%-80px)] p-6">
            
               
//             {!orgId ?(

//             <EmptyOrg />
//             ):(
//                <BoardList 
//                orgId={orgId}
//                query={params}
//                />
//             )
//         }
//             </div>
//     )
// }

// export default DashboardPage
"use client"

import { BoardList } from "../_components/board-list";
import { EmptyOrg } from "../_components/empty-org";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// const DashboardPage = ({ searchParams }) => {
//   const { userId, isLoaded } = useAuth();
//   const { organization } = useOrganization();

//   if (!isLoaded) return null;

//   if (!userId) {
//     redirect("/sign-in");
//   }

//   const query = {
//     search: searchParams?.search,
//     favorites: searchParams?.favorites,
//   };

//   return (
//     <div className="flex-1 h-[calc(100%-80px)] p-6">
//       {!organization ? (
//         <EmptyOrg />
//       ) : (
//         <BoardList orgId={organization.id} query={query} />
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";

const DashboardPage =  ({ searchParams }) => {
  const { userId, orgId } =  useAuth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!orgId ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={orgId} query={searchParams} />
      )}
    </div>
  );
};
export default DashboardPage;