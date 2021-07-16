import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PageContext } from "../layout/pageContext";

interface UseTrackBoundsOptions {
  /** Whether the hook should be tracking the element on scroll */
  shouldTrack: boolean;
}

export function useTrackBounds<ElementType extends HTMLElement>(
  { shouldTrack }: UseTrackBoundsOptions = {
    shouldTrack: true,
  }
): [MutableRefObject<ElementType>, DOMRect] {
  const trackingRef = useRef<ElementType>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [boundingRect, setBoundingRect] = useState<DOMRect>(null);

  useEffect(() => {
    const elem = trackingRef?.current;
    if (!elem) return;

    const scrollHandler = () => {
      setBoundingRect(elem.getBoundingClientRect());
    };

    if (shouldTrack && !isTracking) {
      window.addEventListener("scroll", scrollHandler);
      scrollHandler();
      setIsTracking(true);
      return;
    }

    if (!shouldTrack && isTracking) {
      window.removeEventListener("scroll", scrollHandler);
      setIsTracking(false);
      return;
    }

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [trackingRef, shouldTrack, isTracking, setBoundingRect, setIsTracking]);

  return [trackingRef, boundingRect];
}
