import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
// process.env.LIVEBLOCKS_SECRET_KEY!
const liveblocks = new Liveblocks({
  secret:"sk_dev_xrCFQHVpW-R6bxtG6pfJyWDHb8OfqgVsZ7QA7Y4my0K0iMDzfzzIes2RHR7JbKee" ,
});

export async function POST(request: Request) {
  const { userId, orgId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  if (!room) {
    return new Response("Room id required", { status: 400 });
  }

  const board = await convex.query(api.board.get, { id: room });

  if (!board || board.orgId !== orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    avatar: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });
 console.log("userInfo___",userInfo)
  session.allow(room, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  // console.log("body___",body)

  return new Response(body, { status });
}