"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);

  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Teammate";
  // console.log("Cursor:", cursor);
  if (!cursor) {
    return null;
  }
const {x,y} = cursor
  // return <foreignObject style={{transform:`translateX(${x}px) translateY(${y}px)`}} height={50} width={50} className="relative drop-shadow-md" >
//   return   <foreignObject
//     style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
//     height={50}
//     width={50}
//     className="relative drop-shadow-md"
//   >
//     <MousePointer2 
//     className="h-5 w-5"
//     style={{fill:connectionIdToColor(connectionId),color:connectionIdToColor(connectionId)}}
//     />
//   </foreignObject>
// });
return (
  <g transform={`translate(${x}, ${y})`}>
  {/* Cursor icon */}
  <MousePointer2
    className="h-5 w-5 drop-shadow-md"
    fill={connectionIdToColor(connectionId)}
    color={connectionIdToColor(connectionId)}
  />

  {/* Background rectangle for name */}
  <rect
    x={25}                        // offset from cursor
    y={12}                        // vertical offset
    width={name.length * 7 + 8}    // approximate width + padding
    height={16}                     // height of label
    rx={3} ry={3}                   // rounded corners
    fill={connectionIdToColor(connectionId)}
  />

  {/* Name text */}
  <text
    x={30}                          // offset inside rect for padding
    y={24}                           // vertical alignment
    fill="white"
    fontSize={12}
    fontWeight="bold"
    fontFamily="sans-serif"
  >
    {name}
  </text>
</g>
//   <g transform={`translate(${x}, ${y})`} width={name.length*10 +24} height={50}>
//     <MousePointer2
//       className="h-5 w-5 drop-shadow-md"
//       fill={connectionIdToColor(connectionId)}
//       color={connectionIdToColor(connectionId)}
//     />
//     {/* <div className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
//     style={{backgroundColor:connectionIdToColor(connectionId)}}
//     >

//     </div> */}
//     <div className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold">

//     <rect
//   x={0}
//   y={-12}
//   width={name.length*10 +24}
//   height={16}
//   rx={3}
//   ry={3}
//   fill="blue"
//   // fill={connectionIdToColor(connectionId)}
// />
// <text x={4} y={0} fill="white" fontSize={12} fontWeight="bold">
//   {name}
// </text>
//     </div>
//   </g>
)})

Cursor.displayName = "Cursor";
