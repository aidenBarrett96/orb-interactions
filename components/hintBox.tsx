import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@chakra-ui/layout";
import { useInView, observe } from "react-intersection-observer";
import { useTrackBounds } from "./hooks/useTrackBounds";
import { OrbContext } from "./orb/orbContext";
import { areAnyNullish } from "./misc/areAnyNullish";
import { useWindowMousePosition } from "./hooks/useWindowMousePosition";

export const HintBox: FC = () => {
  const ref = useRef<HTMLDivElement>();
  const [inViewRef, inView] = useInView();
  const [boundingRectRef, boundingRect] = useTrackBounds<HTMLDivElement>();
  const mousePosition = useWindowMousePosition();

  const { orbActualPosition, focusOrbOnPoint, unfocus, isFocused } =
    useContext(OrbContext);

  const [orbIsInBounds, setOrbIsInBounds] = useState<boolean>(false);

  useEffect(() => {
    console.log("focuslogic");
    if (!boundingRect) return;
    if (!orbIsInBounds && isFocused) unfocus();
    if (isFocused) return;
    if (orbIsInBounds)
      return focusOrbOnPoint({
        x: boundingRect.left - 32,
        y: boundingRect.top - 32,
      });
  }, [orbIsInBounds, focusOrbOnPoint, unfocus, boundingRect, isFocused]);

  useEffect(() => {
    console.log("isboundiglogic");
    const { x, y } = mousePosition || {};
    const { left, top, right, bottom } = boundingRect || {};
    if (areAnyNullish([x, y, left, top, right, bottom])) return;
    if (x < left - 200 || y < top - 200 || x > right + 200 || y > bottom + 200)
      return setOrbIsInBounds(false);
    setOrbIsInBounds(true);
  }, [mousePosition, boundingRect]);

  // Use `useCallback` so we don't recreate the function on each render - Could result in infinite loop
  const setRefs = useCallback(
    (node) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node;
      boundingRectRef.current = node;
      // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
      inViewRef(node);
    },
    [inViewRef, ref, boundingRectRef]
  );

  return <Box ref={setRefs} height="30vw" w="30vw" background="white "></Box>;
};
