import { useContext, useEffect, useState } from "react";
import { Position } from "../../types/position";
import { useWindowMousePosition } from "../hooks/useWindowMousePosition";
import { PageContext } from "../layout/pageContext";

interface UseOrbStandardPositionProps {
  orbSize: number;
}

export const useOrbStandardPosition = ({
  orbSize,
}: UseOrbStandardPositionProps): Position => {
  const { pageRef } = useContext(PageContext);

  // Hold the position in the local state
  const [position, setPosition] = useState<Position>(undefined);

  // Bring in the mouse position
  const mousePosition = useWindowMousePosition();

  const [isScrollListenerInitialized, setIsScrollListenerInitialized] =
    useState<boolean>(false);

  // Set the standard position when the size changes
  useEffect(() => {
    if (!pageRef) return;
    setPosition({
      x: (mousePosition?.x || 0) + orbSize * 0.5,
      y: (mousePosition?.y || 0) + orbSize * -1,
    });
  }, [
    orbSize,
    mousePosition,
    pageRef,
    isScrollListenerInitialized,
    setIsScrollListenerInitialized,
  ]);

  return position;
};
