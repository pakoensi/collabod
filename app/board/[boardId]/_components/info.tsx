"use client";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface Infoprops {
  boardId: string;
}

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    // <div className="text-neutral-300 px-1.5"></div>
    <div className="h-6 border-r border-neutral-300 mx-2" />
    // <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md"></div>
  );
};
export const Info = ({ boardId }: Infoprops) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"board">,
  });
  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white  rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffSet={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" height={60} width={60} />

            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                fonts.className
              )}
            >
              Collabod
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffSet={10}>
        <Button
          onClick={() => onOpen(data?._id, data?.title)}
          variant="board"
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Go to boards" side="bottom" sideOffSet={10}>

      <Actions id={data._id} title={data.title} side="bottom" sideOffSet={10}>
        <div>
          <Hint label="Access menu" side="bottom" sideOffSet={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
      </Hint>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-75" />
  );
};
