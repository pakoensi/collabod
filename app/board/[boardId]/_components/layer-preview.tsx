"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import { memo, useEffect } from "react";
import { Ellipse } from "./ellipse";
import { Note } from "./note";
import { Rectangle } from "./rectangle";
import { Text } from "./text";
import { Path } from "./path";
import { colorToCSS } from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    console.log("Layer1..", layer);
    // This will trigger every time the layer data actually changes in storage
    // useEffect(() => {
    //   if (layer) {
    //     console.warn("Layer updated/created:", id, layer);
    //   }
    // }, [layer, id]);
    if (!layer) {
      console.log("No Layer..");
      return null;
    }
    switch (layer.type) {
        // case LayerType.Path:
        //     return(
        //         <Path key={id} points={layer.points} onPointerDown={(e) => onLayerPointerDown(e, id)} stroke={selectionColor} x={layer.x} y={layer.y} fill={layer.fill?colorToCSS(layer.fill):"#000"} />
        //     )
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      //     case LayerType.Note:
      //         return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointDown} selectionColor={selectionColor} />
      default:
        console.log("Unknow layer type ", layer);
        return null;
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
);
LayerPreview.displayName = "LayerPreview";
