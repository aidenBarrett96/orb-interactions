import { createContext, MutableRefObject } from "react";

interface PageContextType {
  pageRef: HTMLDivElement;
  getPageRef: () => HTMLDivElement;
}

export const PageContext = createContext<PageContextType>({
  pageRef: null,
  getPageRef: null,
});
export const { Provider: PageContextProvider } = PageContext;
