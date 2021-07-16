import { useContext, useMemo } from "react";
import { PageContext } from "./pageContext";

export const useGetPageElement = () => {
  const { getPageRef } = useContext(PageContext);

  return useMemo(getPageRef, [getPageRef]);
};
