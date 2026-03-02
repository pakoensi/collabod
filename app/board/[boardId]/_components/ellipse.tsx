import { colorToCSS } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";
import React from "react";

interface EllipseProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, id: string) => void;
  layer: EllipseLayer;
  selectionColor?: string;
}
export const Ellipse = ({
  id,
  onLayerPointerDown,
  layer,
  selectionColor,
}: EllipseProps) => {
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onLayerPointerDown(e, id)}
      style={{ transform: `translate(${layer.x}px,${layer.y}px)` }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCSS(layer.fill) : "#00"}
      stroke={selectionColor || "transparent"}
      strokeWidth="1"
    />
  );
};
