import { Room } from "@/components/room"
import { Canvas } from "./_components/canvas"
import { Info } from "./_components/info"
import { Loading } from "./_components/loading"


interface BoardIDPageProps{
params:{
    boardId:string
}
}
const BoardIdPage =async ({params}:BoardIDPageProps)=>{
    const {boardId} = await params
   
   
    return(
        <Room roomId={boardId} fallback={<Loading/>}>

            <Canvas boardId={boardId}/>
           
        </Room>
    )
}

export default BoardIdPage