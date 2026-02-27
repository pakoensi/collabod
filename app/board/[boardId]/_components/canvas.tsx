"use client";

import { useCallback, useState } from "react";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useRedo,
  useSelf,
  useMutation,
} from "@liveblocks/react/suspense";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState, Color, LayerType,Point } from "@/types/canvas";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { useStorage } from "@liveblocks/react";
import {nanoid} from 'nanoid'
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYERS = 100

interface CanvasProps {
  boardId: string;
}
export const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage((root)=>root.layerIds)
  const { name, avatar } = useSelf((me) => me.info);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera,setCamera] =useState<Camera>({x:0,y:0})
const [lastUsedColor,setLastUsedColor]=useState<Color>({
    r:0,
    g:0,
    b:0
})

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    {storage,setMyPresence},
    layerType:LayerType.Ellipse | LayerType.Rectangle|LayerType.Text |LayerType.Note,
    position:Point
  )=>{
    const liveLayers = storage.get("layers")
    const liveLayerIds = storage.get("layerIds")

if (!liveLayers || !liveLayerIds) {
  console.warn("Storage not ready yet");
  return;
}

    if(liveLayers.size>=MAX_LAYERS){
        return
    }

    const layerId = nanoid()
    const layer = new LiveObject({
        type:layerType,
        x:position.x,
        y:position.y,
        height:100,
        width:100,
        fill:lastUsedColor
    })
    liveLayerIds.push(layerId)
    liveLayers.set(layerId,layer)

    setMyPresence({selection:[layerId]},{addToHistory:true})
    setCanvasState({mode:CanvasMode.None})
  },[lastUsedColor])

  const onWheel = useCallback((e:React.WheelEvent)=>{
    setCamera({
        x:camera.x-e.deltaX,
        y:camera.y -e.deltaY
    })
  },[])


// const onWheel = useCallback((e: React.WheelEvent) => {
//   setCamera((prev) => ({
//     x: prev.x - e.deltaX,
//     y: prev.y - e.deltaY,
//   }));
// }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e,camera);

      setMyPresence({ cursor: current });
    },
    [camera]
  );

  const onPointerLeave = useMutation(({setMyPresence})=>{
    setMyPresence({cursor:null})
  },[])

  const onPointerUp = useMutation((
    {},
    e
  )=>{
    const point = pointerEventToCanvasPoint(e,camera)
    console.log({
        point,
        mode:canvasState.mode,
    })
    if(canvasState.mode===CanvasMode.Inserting){
        insertLayer(canvasState.layerType, point)
    }else{
        setCanvasState({
            mode:CanvasMode.None
        })
    }
    history.resume()
  },[camera,canvasState,history,insertLayer])

  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        CanvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg className="h-screen w-screen"
      onWheel={onWheel}
       onPointerMove={onPointerMove}
       onPointerLeave={onPointerLeave}
       onPointerUp={onPointerUp}
      >
        <g style={{transform:`translate(${camera.x}px,${camera.y}px)`}} >
            {layerIds && layerIds.map((layerId)=>(
                <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointDown={()=>{}}
                selectionColor="#000"
                />
            ))
            }
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
