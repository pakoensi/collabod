"use client";

import { colorToCSS } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-41 pr-2 mr-2 border-r border-neutral-200">
      <ColorButton
        color={{
          r: 243,
          g: 82,
          b: 35,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 249,
          b: 177,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 68,
          g: 202,
          b: 99,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 39,
          g: 142,
          b: 237,
        }}
        onClick={onChange}
      />

      <ColorButton
        color={{
          r: 155,
          g: 105,
          b: 245,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 252,
          g: 142,
          b: 42,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 0,
          g: 0,
          b: 0,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 255,
          b: 255,
        }}
        onClick={onChange}
      />

      {/* additional colors */}
      {/* <ColorButton
        color={{ r: 239, g: 68, b: 68 }} // red
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 249, g: 115, b: 22 }} // orange
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 234, g: 179, b: 8 }} // yellow
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 34, g: 197, b: 94 }} // green
        onClick={onChange}
      /> */}

      {/* <ColorButton
        color={{ r: 20, g: 184, b: 166 }} // teal
        onClick={onChange}
      /> */}
      {/* <ColorButton
        color={{ r: 6, g: 182, b: 212 }} // cyan
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 59, g: 130, b: 246 }} // blue
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 99, g: 102, b: 241 }} // indigo
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 168, g: 85, b: 247 }} // purple
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 236, g: 72, b: 153 }} // pink
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 244, g: 63, b: 94 }} // rose
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 107, g: 114, b: 128 }} // gray
        onClick={onChange}
      />
      <ColorButton
        color={{ r: 0, g: 0, b: 0 }} // black
        onClick={onChange}
      /> */}
      {/* <ColorButton
        color={{ r: 255, g: 255, b: 255 }} // white
        onClick={onChange}
      /> */}
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="2-8 h-8 items-center flex justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCSS(color) }}
      />
    </button>
  );
};
