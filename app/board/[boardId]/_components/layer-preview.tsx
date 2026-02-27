"use client"

import { LayerType } from "@/types/canvas"
import { useStorage } from "@liveblocks/react"
import { memo } from "react"
import { Rectangle } from "./rectangle"

interface LayerPreviewProps {
    id:string
    onLayerPointDown:(e:React.PointerEvent,layerId:string)=>void
    selectionColor?:string
}
export  const LayerPreview =memo(
({id,onLayerPointDown,selectionColor}:LayerPreviewProps)=>{
  const layer = useStorage((root)=>root.layers.get(id))
  console.log('Layer..',layer)
  if(!layer){
    return null
  }
  const type = Number(layer?.type); // ensure it’s a number
  switch(layer.type){
    case LayerType.Rectangle:
          return(
       <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
    );
    default:
        console.warn("Unknow layer type ",layer?.type)
        return null
  }
// switch(layer.type){
//     case LayerType.Rectangle:
//         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
//     case LayerType.Ellipse:
//         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
//     case LayerType.Text:
//         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
//     case LayerType.Note:
//         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
//     case LayerType.Path:
//         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
//     default:
//         console.warn("Unknown layer type", layer.type)
//         return null
// }
  
}
) 
LayerPreview.displayName = "LayerPreview"