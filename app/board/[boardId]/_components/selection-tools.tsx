"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera } from "@/types/canvas";
import { Color } from "@clerk/types";
import { useMutation, useSelf } from "@liveblocks/react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { memo } from "react";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColors: (color: Color) => void;
}

export const SelectionTool = memo(
  ({ camera, setLastUsedColors }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);
    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable();  //changed from toArray() due to deprecation
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }
        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toImmutable();    //changed from toArray() due to deprecation
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }
        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColors(fill);
        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColors]
    );
    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) {
      return null;
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;
    return (
      //   <div
      //     className="absolute z-50 p-3 rounded-xl bg-white shadow-sm border flex select-none"
      //     style={{
      //       transform: `translate(
      //         calc(${x}px-50%),
      //         calc(${y - 16}px-100%)
      //     )`,
      //     }}
      //   >
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          left: x,
          top: y - 16,
          transform: "translate(-50%, -100%)",
        }}
      >
        <ColorPicker onChange={setFill} />

        <div className="flex flex-col gap-y-0">
          <Hint label="Bring to front">
            <Button onClick={moveToFront} variant="board" size="icon">
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to Back" side="bottom">
            <Button onClick={moveToBack} variant="board" size="icon">
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);
SelectionTool.displayName = "SelectionTools";
