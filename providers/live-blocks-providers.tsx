"use client";

import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { createClient } from "@liveblocks/client";
const client = createClient({
  publicApiKey: "pk_dev_ZJ7TrJsS-VHvarJtGvmwiE68ofpMpz44SceVytKZAUB1pMCR9CYFGi60QI6fLmrG",
  throttle: 16, // in milliseconds (16ms ≈ 60fps)
});
export const LiveblocksClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      {children}
    </LiveblocksProvider>
  );
};
//  publicApiKey="pk_dev_ZJ7TrJsS-VHvarJtGvmwiE68ofpMpz44SceVytKZAUB1pMCR9CYFGi60QI6fLmrG"