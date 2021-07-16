import { Box } from "@chakra-ui/layout";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PageContextProvider } from "./pageContext";

/** custom page wrapper with context */
export const PageWrapper: FC = ({ children }) => {
  const [ready, setReady] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [pageRef, setPageRef] = useState<HTMLDivElement>(null);
  console.log(`pageRef`, pageRef);

  const getPageRef = useCallback(() => {
    console.log("object");
    return ref?.current;
  }, [ref]);

  const setRef = useCallback(
    (node: HTMLDivElement) => {
      if (!ready) return;
      console.log("egedge");
      ref.current = node;
      console.log(`ref`, ref);
      setPageRef(node);
    },
    [ready]
  );

  useEffect(() => {
    console.log(`ref`, ref);
    // setPageRef(ref?.current);
  }, [ref]);

  useEffect(() => {
    console.log("test");
    setReady(true);
  }, [setReady]);

  return (
    <PageContextProvider value={{ pageRef, getPageRef }}>
      <Box ref={setRef} bg="#00013A" minH="100vh">
        {children}
      </Box>
    </PageContextProvider>
  );
};
