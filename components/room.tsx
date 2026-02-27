"use client";

import { ReactNode } from "react";
import {
  
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveblocksClientProvider } from "@/providers/live-blocks-providers";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";
interface RoomProps{ children: ReactNode,roomId:string,fallback:NonNullable<ReactNode>|null }
export function Room({ children,roomId,fallback }:RoomProps ) {
  return (
   <LiveblocksClientProvider>

      <RoomProvider id={roomId}
       initialStorage={{
    layers: new LiveMap<string, LiveObject<Layer>>(),
    layerIds: new LiveList<string>([]), // must pass empty array
  }}
      initialPresence={{
        cursor:null,
        selection:[]
      }} 
      >
        <ClientSideSuspense fallback={fallback}>
          {()=>children}
        </ClientSideSuspense>
      </RoomProvider>
   </LiveblocksClientProvider>
  );
}