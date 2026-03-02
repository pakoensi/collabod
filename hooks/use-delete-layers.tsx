import { useSelf, useMutation } from "@liveblocks/react";

export const useDeleteLayers = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    ({ storage, setMyPresence }) => {
      if (!selection || selection.length === 0) return;
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      if (!liveLayers || !liveLayerIds) return;

      for (const id of selection) {
        // Remove from map
        liveLayers.delete(id);

        // Remove from list
        const index = liveLayerIds.indexOf(id);
        if (index !== -1) {
          liveLayerIds.delete(index);
        }
      }

      // Clear selection
      setMyPresence({ selection: [] }, { addToHistory: true });
    },
    [selection]
  );
};
